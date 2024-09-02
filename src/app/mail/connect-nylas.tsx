import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConnectNylas({ email }: { email: string }) {
  return (
    <div className="container mx-auto mt-10 space-y-6 max-w-md">
      <h1 className="text-3xl font-bold">Connect to Nylas API</h1>
      <p className="text-muted-foreground">
        To continue, you need to connect your email to the Nylas API.
      </p>
      <div className="space-x-4">
        <Link href={`/api/nylas?email=${email}`}>
          <Button type="submit">Continue</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
