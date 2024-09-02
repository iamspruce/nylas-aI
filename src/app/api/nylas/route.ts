import { NextResponse, NextRequest } from "next/server";
import Nylas from "nylas";

export const config = {
  clientId: process.env.NYLAS_CLIENT_ID!,
  clientSecret: process.env.NYLAS_API_SECRET!,
  redirectUri: process.env.NYLAS_REDIRECT_URI!,
  apiKey: process.env.NYLAS_API_KEY!,
  apiUri: process.env.NYLAS_API_URI!,
  baseURL: process.env.BASE_URL!,
};

export const nylas = new Nylas({
  apiKey: config.apiKey,
  apiUri: config.apiUri,
});

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
