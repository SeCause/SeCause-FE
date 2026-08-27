# 데이터 검증(Validation) 가이드

## 1. API 응답 검증

### 원칙

내부 API 응답 타입은 `openapi-typescript`로 생성한 [`schema.d.ts`](../src/shared/api/schema.d.ts)를 사용하며, 별도의 Zod 스키마는 작성하지 않는 것을 기본으로 한다.

같은 데이터 구조를 OpenAPI와 Zod 양쪽에서 관리하면 중복이 발생하고, 이후 백엔드 스펙이 변경될 때 두 정의가 서로 어긋날 위험이 있다.

```ts
// schema.d.ts에 필드가 다음과 같이 명확히 정의된 경우 별도 Zod 스키마를 작성하지 않는다
result: {
  id: number;
  nickname: string;
  email: string;
}
```

### 예외 적용 기준

다음 세 가지 경우에 한해 Zod 검증을 추가한다.

| 구분                         | 조건                                                                                                            | 적용 예                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------- |
| ① 응답 구조 불명             | `schema.d.ts`에서 `result`가 `unknown`/`object`로 생성되어 필드 구조를 알 수 없는 경우                          | `GET /users/me`           |
| ② OpenAPI 관리 범위 밖       | 외부 API 응답, 직접 파싱한 JSON 등 OpenAPI 타입 계약이 존재하지 않는 데이터                                     | 해당 시 적용              |
| ③ 영향 범위가 큰 핵심 데이터 | 인증·세션·권한처럼 값 오류가 여러 화면·요청에 영향을 주는 경우. 단 OpenAPI 타입이 이미 명확하면 적용하지 않는다 | `POST /auth/github/login` |

**③ 비고**: `POST /auth/github/login`의 응답은 OpenAPI 스펙에 `GithubLoginResponse`로 필드가 정의되어 있어 ①(unknown)에는 해당하지 않는다. 다만 스펙상 모든 필드가 optional로 생성되어 있어, 로그인 직후 애플리케이션 전역에서 사용되는 사용자 식별 정보(`userId`, `email` 등)가 실제로 존재함을 타입·런타임 양쪽에서 보장하기 위해 Zod로 required 처리한다.

### 코드 예시

[`features/auth/api/auth.ts`](../src/features/auth/api/auth.ts)

```ts
const userSchema = z.object({
  id: z.number(),
  nickname: z.string(),
});

const user = parseApiResult(userSchema, res.result);
```

검증 로직은 [`parseApiResult`](../src/shared/api/validate.ts)에 위치하며, 검증 실패 시 콘솔에 상세 내역을 기록하고 에러를 던진다.

<br/>

## 2. 폼 입력 검증

### 원칙

사용자 입력을 받는 모든 폼은 `react-hook-form` + `@hookform/resolvers/zod` 조합을 예외 없이 사용한다. 화면마다 검증 방식이 달라지는 것을 방지하기 위함이다.

### 작성 규칙

- 스키마는 해당 폼이 속한 feature의 `model/schema.ts`에 작성한다.
- `useForm({ resolver: zodResolver(schema) })` 형태로 연결한다.
- 사용자에게 노출하는 에러 메시지는 Zod 스키마의 `message`를 사용한다.
- 폼 타입은 별도로 작성하지 않고 `z.infer<typeof schema>`로 스키마에서 추론한다.

### 코드 예시

[`features/account/model/schema.ts`](../src/features/account/model/schema.ts), [`features/account/ui/ProfileForm.tsx`](../src/features/account/ui/ProfileForm.tsx)

```ts
export const profileFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '이름을 입력해주세요.')
    .max(50, '이름은 50자 이하로 입력해주세요.'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
```

```ts
const { register, handleSubmit } = useForm<ProfileFormValues>({
  resolver: zodResolver(profileFormSchema),
  defaultValues: { name: user.name },
});
```

### 서버 검증과의 관계

프론트엔드 폼 검증은 잘못된 입력에 대한 즉시 피드백 제공과 서버로 전달되는 잘못된 요청의 감소를 목적으로 한다. 프론트엔드 검증은 우회 가능하므로 서버 측 요청값 검증을 대체하지 않으며, 서버에서도 별도의 입력 검증이 필요하다.
