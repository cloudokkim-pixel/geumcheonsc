import { NextRequest, NextResponse } from "next/server";

type ApplyBody = {
  name?: string;
  school?: string;
  grade?: string;
  contact?: string;
  position?: string;
  ageGroup?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: ApplyBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { name, school, grade, contact, ageGroup } = body;

  if (!name?.trim() || !school?.trim() || !grade?.trim() || !contact?.trim() || !ageGroup?.trim()) {
    return NextResponse.json({ error: "필수 항목을 모두 입력해 주세요." }, { status: 422 });
  }

  // 이메일 발송 (환경변수 설정 시 활성화)
  // TODO: nodemailer 또는 Resend/SendGrid 연동
  // 현재는 콘솔 로그 및 200 응답만 반환
  console.log("[apply]", { grade, ageGroup, submittedAt: new Date().toISOString() }); // PII 제외

  return NextResponse.json({ ok: true }, { status: 200 });
}
