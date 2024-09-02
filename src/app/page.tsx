import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  HeartIcon,
  InboxIcon,
  MessageSquareIcon,
  MountainIcon,
} from "lucide-react";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/mail");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">SmartInbox</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
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
                  Welcome to SmartInbox
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Revolutionize your email experience with AI-powered features.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up to get notified when we launch.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="outline">Learn More</Button>
                <Button asChild>
                  <Link href={"/api/auth/signin"}>Sign in with Google</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <InboxIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">AI-Powered Email Sorting</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically categorize emails into different folders based
                  on content and sender.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MessageSquareIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Smart Replies</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate suggested replies for common email types, saving you
                  time.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CalendarIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Meeting Scheduler</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Integrate with your calendar to suggest optimal meeting times
                  and send invites.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FileTextIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Email Summarization</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Use AI to summarize long emails, highlighting key points and
                  action items.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BellIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Follow-Up Reminders</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Track emails that require a response and send reminders if no
                  reply is received.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <HeartIcon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Sentiment Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Analyze the tone of incoming emails to help prioritize
                  responses.
                </p>
              </div>
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
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
