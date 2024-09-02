import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, MessageSquare, ShieldCheck } from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/mail");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">
            SmartInbox
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Email Experience
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  SmartInbox uses AI to summarize emails, suggest smart replies,
                  and learn from your communication style.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button asChild size="lg">
                  <Link href="/api/auth/signin">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Powerful AI Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <BrainCircuit className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    AI-Powered Summaries
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically generate concise summaries of your emails,
                    allowing you to grasp the main points quickly without
                    reading the entire message.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <MessageSquare className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    Smart Reply Suggestions
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get context-aware reply suggestions using advanced AI
                    technology. Respond to emails with just a click, saving you
                    valuable time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <ShieldCheck className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    Personalized AI Training
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our AI assistant learns from your email data, ensuring that
                    summaries and suggestions are tailored to your unique
                    communication style.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 SmartInbox. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
