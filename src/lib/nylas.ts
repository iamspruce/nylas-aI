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
