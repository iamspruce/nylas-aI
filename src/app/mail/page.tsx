import { Mail as MailType } from "./types";
import { Mail } from "./mail";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Nylas from "nylas";
import ConnectNylas from "./connect-nylas";
import TrainAI from "./train-ai";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_SECRET!,
  apiUri: process.env.NYLAS_API_URI!,
});

async function fetchEmails(grantId: string): Promise<MailType[]> {
  try {
    const queryParams = {
      limit: 10,
    };

    const messages = await nylas.messages.list({
      identifier: grantId,
      queryParams,
    });

    if (messages.data.length > 0) {
      return messages.data.map((message) => ({
        id: message.id,
        subject: message.subject || "No Subject",
        email: message.from?.[0]?.email || "No Email",
        name: message.from?.[0]?.name || "No Name",
        date: message.date,
        text: message.snippet || "No Snippet",
        body: message.body || "No Body",
        read: !message.unread,
        labels: message.folders || [],
      }));
    }
  } catch (error) {
    console.error("Failed to fetch emails:", error);
  }
  return [];
}

export default async function MailPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
    return null;
  }

  // Fetch user data
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  // Check if user has grantId and if AI is trained (e.g., check if any documents exist)
  const aiTrained =
    (await prisma.document.count({
      where: { namespace: "default" },
    })) > 0;

  // Handle the case where grantId is missing
  if (!user?.grantId) {
    return <ConnectNylas email={user?.email!} />;
  }

  // Handle the case where AI isn't trained
  if (!aiTrained) {
    return <TrainAI />;
  }

  // Fetch emails if grantId exists
  const mails = await fetchEmails(user.grantId);

  return (
    <div className="flex-col md:flex">
      <Mail
        account={{
          label: session.user?.name || "Unknown User",
          email: session.user?.email || "No Email",
        }}
        mails={mails}
        navCollapsedSize={4}
      />
    </div>
  );
}
