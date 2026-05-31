import { NextRequest, NextResponse } from 'next/server';

import { buildClientHeaders, buildUpstreamHeaders } from './headers';
import { buildUpstreamUrl } from './url';

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const targetUrl = buildUpstreamUrl(request, path);

  if (!targetUrl) {
    return NextResponse.json({ message: 'API base URL is not configured.' }, { status: 500 });
  }

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
  const upstreamResponse = await fetch(targetUrl, {
    method: request.method,
    headers: buildUpstreamHeaders(request),
    body,
    redirect: 'manual',
    cache: 'no-store',
  });

  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: buildClientHeaders(upstreamResponse, request),
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
