import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  const admin = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!email || !admin || email !== admin) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { paramsToSign } = await req.json();
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );
  return NextResponse.json({ signature });
}
