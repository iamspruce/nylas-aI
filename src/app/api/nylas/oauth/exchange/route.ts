import { config, nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new NextResponse(
      "No authorization code or email returned from Nylas",
      {
        status: 400,
      }
    );
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: `${config.baseURL}/${config.redirectUri}`,
      code,
    });

    const { grantId, email } = response;

    // Update the user with the grantId
    await prisma.user.update({
      where: { email },
      data: { grantId: grantId },
    });

    // Redirect to a success page or homepage
    return NextResponse.redirect(`${config.baseURL}/mail?success=true`);
  } catch (error) {
    console.error("Failed to exchange authorization code for token:", error);
    return new NextResponse("Failed to exchange authorization code for token", {
      status: 500,
    });
  }
}
