
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import {
  Badge,
  Bot,
  Code2,
  Eye,
  Layers,
  BarChart3,
  Mic,
  Network,
  PlusSquare,
  Swords,
  User,
  Users,
  Zap,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/challenges", icon: Swords, label: "Challenges" },
  { href: "/ai-assistant", icon: Bot, label: "AI Assistant" },
  { href: "/learning-paths", icon: Network, label: "Learning Paths" },
  { href: "/leaderboard", icon: BarChart3, label: "Leaderboard" },
  { href: "/live-battles", icon: Zap, label: "Live Battles" },
  { href: "/code-visuals", icon: Eye, label: "Code Visuals" },
  { href: "/mini-projects", icon: Layers, label: "Mini Projects" },
  { href: "/soft-skills", icon: Users, label: "Soft Skills" },
  { href: "/build-challenge", icon: PlusSquare, label: "Build Challenge" },
  { href: "/voice-coding", icon: Mic, label: "Voice Coding" },
];


export default function AppSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const bottomNavItems = [
    { href: "/my-badges", icon: Badge, label: "My Badges" },
    { 
      href: "/auth", 
      icon: user ? User : LogIn, 
      label: user ? "My Account" : "Sign In",
      onClick: undefined
    },
    { 
      href: "#", 
      icon: LogOut, 
      label: "Sign Out", 
      onClick: signOut,
      hidden: !user
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="text-lg font-headline">Code Quest</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            {bottomNavItems.map((item) => (
                !item.hidden && <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                    asChild={!item.onClick}
                    onClick={item.onClick}
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                    {item.onClick ? (
                       <>
                      <item.icon />
                      <span>{item.label}</span>
                       </>
                    ) : (
                  <Link href={item.href}>
                         <item.icon />
                              <span>{item.label}</span>
                    </Link>
                    )}
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
