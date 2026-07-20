"use client";

import Link from "next/link";
import { Menu, Moon, Sun, LogOut, Settings, UserCircle } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { useProfile } from "@/hooks/useProfile";
import Avatar from "@/components/ui/Avatar";
import { getInitials } from "@/lib/utils";

export default function Navbar({ onMenuClick, title }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const { profile } = useProfile();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] glass px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[var(--muted)] hover:bg-slate-100 dark:hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && <h1 className="text-lg font-semibold text-[var(--foreground)]">{title}</h1>}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-slate-100 hover:text-[var(--foreground)] dark:hover:bg-white/5"
        >
          {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-slate-100 dark:hover:bg-white/5">
              <Avatar
                src={profile?.profileImageUrl}
                initials={getInitials(user?.firstName, user?.lastName)}
                size="sm"
              />
              <span className="hidden text-sm font-medium text-[var(--foreground)] sm:block">
                {user?.firstName || "Account"}
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-lg"
            >
              <DropdownMenu.Item asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] outline-none hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <UserCircle className="h-4 w-4" /> My Profile
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--foreground)] outline-none hover:bg-slate-50 dark:hover:bg-white/5">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-[var(--border)]" />
              <DropdownMenu.Item
                onClick={logout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--danger)] outline-none hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
