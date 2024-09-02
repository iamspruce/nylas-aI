"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  account: {
    label: string;
    email: string;
  };
}

export function AccountSwitcher({
  isCollapsed,
  account,
}: AccountSwitcherProps) {
  return (
    <Select defaultValue="0">
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              <Avatar className={cn("h-8 w-8", isCollapsed && "rounded-none")}>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${account.label}`}
                  alt={account.label}
                  className={cn(isCollapsed && "rounded-none")}
                />
                <AvatarFallback className={cn(isCollapsed && "rounded-none")}>
                  {account.label.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={cn(isCollapsed && "hidden")}>
                <p className="font-semibold">{account.label}</p>
              </div>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <Button variant={"ghost"}>Switch Account</Button>
      </SelectContent>
    </Select>
  );
}
