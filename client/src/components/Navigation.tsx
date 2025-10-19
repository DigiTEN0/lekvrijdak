import { Link, useLocation } from "wouter";
import { Menu, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { serviceTypes } from "@shared/schema";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/over-ons", label: "Over Ons" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home-logo">
            <img 
              src="http://www.digiten.nl/wp-content/uploads/2025/10/signature-2-scaled.png" 
              alt="Lekvrijdak Logo" 
              className="h-10"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={isActive(link.href) ? "bg-accent" : ""}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" data-testid="button-diensten-dropdown">
                  Diensten
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {serviceTypes.map((service) => (
                  <DropdownMenuItem key={service} asChild>
                    <Link 
                      href={`/diensten/${service.toLowerCase().replace(/ /g, "-")}`}
                      className="w-full"
                      data-testid={`link-service-${service.toLowerCase().replace(/ /g, "-")}`}
                    >
                      {service}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-4 ml-6 pl-6 border-l">
              <a href="tel:+31612466941" className="flex items-center gap-2 text-sm hover-elevate rounded-md px-3 py-2" data-testid="link-phone">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-medium">+31 6 1246 6941</span>
              </a>
            </div>

            <Link href="/admin/login">
              <Button data-testid="button-cta-offerte">
                Inloggen
              </Button>
            </Link>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {mainLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${isActive(link.href) ? "bg-accent" : ""}`}
                      onClick={handleLinkClick}
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold mb-2 px-2">Diensten</p>
                  {serviceTypes.map((service) => (
                    <Link 
                      key={service}
                      href={`/diensten/${service.toLowerCase().replace(/ /g, "-")}`}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={handleLinkClick}
                        data-testid={`link-mobile-service-${service.toLowerCase().replace(/ /g, "-")}`}
                      >
                        {service}
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <a href="tel:+31612466941" className="flex items-center gap-2 px-2 text-sm" data-testid="link-mobile-phone">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium">+31 6 1246 6941</span>
                  </a>
                  <a href="mailto:info@lekvrijdak.nl" className="flex items-center gap-2 px-2 text-sm" data-testid="link-mobile-email">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>info@lekvrijdak.nl</span>
                  </a>
                </div>

                <Link href="/admin/login" className="pt-2">
                  <Button className="w-full" onClick={handleLinkClick} data-testid="button-mobile-cta-offerte">
                    Inloggen
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
