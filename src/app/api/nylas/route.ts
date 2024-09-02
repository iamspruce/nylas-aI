import { config, nylas } from "@/lib/nylas";
import { NextResponse, NextRequest } from "next/server";
import Nylas from "nylas";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  try {
    const authUrl = nylas.auth.urlForOAuth2({
      clientId: config.clientId,
      provider: "google", // or any other provider Nylas supports
      redirectUri: `${config.baseURL}/${config.redirectUri}`,
      loginHint: email || "",
    });

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Failed to generate Nylas OAuth URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
