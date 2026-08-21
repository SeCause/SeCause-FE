// .env(gitignore됨)의 NEXT_PUBLIC_API_BASE_URL을 읽어 OpenAPI 스펙 URL을 리터럴로
// 저장소에 남기지 않는다. `pnpm generate:api-types`로 실행.
import fs from 'node:fs';
import path from 'node:path';

import openapiTS, { astToString } from 'openapi-typescript';

function loadEnvBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL;

  const envPath = path.resolve(process.cwd(), '.env');
  const envText = fs.readFileSync(envPath, 'utf-8');
  const match = envText.match(/^NEXT_PUBLIC_API_BASE_URL\s*=\s*(.+)$/m);
  if (!match) {
    throw new Error('.env에 NEXT_PUBLIC_API_BASE_URL이 없습니다.');
  }
  return match[1].trim();
}

const baseUrl = loadEnvBaseUrl();
const outPath = path.resolve(process.cwd(), 'src/shared/api/schema.d.ts');

const ast = await openapiTS(new URL(`${baseUrl}/api-docs`));
fs.writeFileSync(outPath, astToString(ast));

console.log(`${outPath} 생성 완료`);
