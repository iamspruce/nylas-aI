"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function TrainAI() {
  const [emailDataset, setEmailDataset] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const sampleDatasets = [
    {
      name: "Enron Email Dataset",
      link: "https://datasets-server.huggingface.co/rows?dataset=hossein20s%2Fenrun-emails-text-classification&config=default&split=train&offset=0&length=100",
    },
    {
      name: "Marketing Email Dataset",
      link: "https://datasets-server.huggingface.co/rows?dataset=mynkchaudhry%2FMarketing_Email_dataset&config=default&split=train&offset=0&length=100",
    },
  ];

  const handleTrainAI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ datasetUrl: emailDataset }),
      });

      if (!response.ok) {
        throw new Error("Failed to train AI");
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: data.message,
      });

      // Navigate to the mail page after successful training
      router.push("/mail");
    } catch (error) {
      console.error("Error training AI:", error);
      toast({
        title: "Error",
        description: "Failed to train AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied",
          description: "Dataset link copied to clipboard",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Error",
          description: "Failed to copy link",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="container mx-auto mt-10 space-y-6 max-w-md">
      <h1 className="text-3xl font-bold">Train AI with Email Data</h1>
      <p className="text-muted-foreground">
        Please input the email dataset you want to use to train the AI model.
      </p>
      <div className="space-y-4">
        <Label htmlFor="email-dataset">Email Dataset</Label>
        <Input
          id="email-dataset"
          className="col-span-3"
          value={emailDataset}
          onChange={(e) => setEmailDataset(e.target.value)}
          placeholder="Enter dataset link or paste copied link here"
        />
        <div className="text-sm text-muted-foreground">
          Sample datasets (click to copy link):
        </div>
        {sampleDatasets.map((dataset, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-between text-left text-sm"
            onClick={() => copyToClipboard(dataset.link)}
          >
            <span>{dataset.name}</span>
            <Copy className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <div className="space-x-4">
        <Button
          type="submit"
          onClick={handleTrainAI}
          disabled={isLoading || !emailDataset}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Training...
            </>
          ) : (
            "Train AI"
          )}
        </Button>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
