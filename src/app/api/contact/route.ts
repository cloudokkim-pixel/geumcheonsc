import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  contact?: string;
  inquiryType?: string;
  detail?: string;
};

export async function POST(req: NextRequest) {
  let body: ContactBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { name, contact, inquiryType } = body;

  if (!name?.trim() || !contact?.trim() || !inquiryType?.trim()) {
    return NextResponse.json({ error: "필수 항목을 모두 입력해 주세요." }, { status: 422 });
  }

  // 이메일 발송 — nodemailer / Resend 연동 시 활성화
  console.log("[contact]", { inquiryType: inquiryType.trim(), submittedAt: new Date().toISOString() }); // PII 제외

  return NextResponse.json({ ok: true }, { status: 200 });
}
