"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X, LogOut, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MenuItem } from "@/lib/menu-config";
import { useNavbar } from "./navbar-provider";
import { useFilteredMenu } from "@/hooks/useFilteredMenu";
import { ModeToggle } from "./toggle-mode";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavbar();
  const filteredMenuItems = useFilteredMenu();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const renderNavigationItem = (item: MenuItem) => {
    if (item.children) {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger className="h-9">
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.children.map((child) => (
                <NavigationMenuLink key={child.id} asChild>
                  <Link
                    href={child.href || "#"}
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      isActiveLink(child.href || "") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      {child.label}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {child.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuLink asChild>
          <Link
            href={item.href || "#"}
            className={cn(
              "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              isActiveLink(item.href || "") &&
                "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.label}
            </div>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem, level = 0) => {
    if (item.children) {
      return (
        <div key={item.id} className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium",
              level > 0 && "pl-6"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </div>
          <div className="space-y-1">
            {item.children.map((child) =>
              renderMobileMenuItem(child, level + 1)
            )}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href || "#"}
        onClick={closeMobileMenu}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          level > 0 && "pl-6",
          isActiveLink(item.href || "") && "bg-accent text-accent-foreground"
        )}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">
                  V
                </span>
              </div>
              <span className="font-bold text-xl">Valnut</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {filteredMenuItems.map(renderNavigationItem)}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session?.user?.profile?.firstName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">
                    {session?.user?.profile?.firstName}{" "}
                    {session?.user?.profile?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.profile?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/checkout">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Pagos</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {filteredMenuItems.map((item) => renderMobileMenuItem(item))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
