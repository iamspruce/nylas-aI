"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Loader2, Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

import { MailDisplayProps } from "./types";

export function MailDisplay({ mail }: MailDisplayProps) {
  const [smartReply, setSmartReply] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (mail) {
      generateSmartReply();
      generateSummary();
    }
  }, [mail]);

  const generateText = async (prompt: string): Promise<string | null> => {
    try {
      const response = await fetch("/api/ai/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate text");
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Error generating text:", error);
      toast({
        title: "Error",
        description: "Failed to generate text. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };

  const generateSmartReply = async () => {
    setIsGeneratingReply(true);
    const prompt = `Generate a smart reply for an email from ${mail?.name} (${mail?.email}) regarding "${mail?.subject}".`;
    const reply = await generateText(prompt);
    if (reply) setSmartReply(reply);
    setIsGeneratingReply(false);
  };

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    const prompt = `Summarize the following email content:\n\n${mail?.text}`;
    const summary = await generateText(prompt);
    if (summary) setSummary(summary);
    setIsGeneratingSummary(false);
  };

  if (!mail) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No message selected</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${mail.name}`}
                alt={mail.name}
              />
              <AvatarFallback>{mail.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{mail.name}</h2>
              <p className="text-sm text-muted-foreground">{mail.email}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(mail.date), "PPpp")}
          </p>
        </div>

        <Separator />

        <h3 className="text-xl font-semibold">{mail.subject}</h3>

        <Collapsible
          open={isSummaryExpanded}
          onOpenChange={setIsSummaryExpanded}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Summary</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isSummaryExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle summary</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            {isGeneratingSummary ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm whitespace-pre-wrap">{summary}</p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <div className="whitespace-pre-wrap text-sm">{mail.text}</div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Smart Reply</h4>
          {isGeneratingReply ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <Textarea
              placeholder="Type your reply..."
              value={smartReply}
              onChange={(e) => setSmartReply(e.target.value)}
              rows={6}
            />
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={generateSmartReply}
              disabled={isGeneratingReply}
            >
              {isGeneratingReply && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Regenerate
            </Button>
            <Button disabled={isGeneratingReply}>
              <Send className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
