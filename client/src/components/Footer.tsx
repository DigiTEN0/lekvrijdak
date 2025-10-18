import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { serviceTypes } from "@shared/schema";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img 
              src="https://lekvrijdak.nl/wp-content/uploads/2023/12/new.png" 
              alt="Lekvrijdak Logo" 
              className="h-12 mb-4"
            />
            <p className="text-sm text-muted-foreground mb-4">
              Specialist in dakdekken, dakreparatie en dakonderhoud. Vakmanschap en kwaliteit gegarandeerd.
            </p>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="tel:+31612466941" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1 -ml-2" data-testid="link-footer-phone">
                <Phone className="h-4 w-4 text-primary" />
                <span>+31 6 1246 6941</span>
              </a>
              <a href="mailto:info@lekvrijdak.nl" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1 -ml-2" data-testid="link-footer-email">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@lekvrijdak.nl</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Diensten</h3>
            <ul className="space-y-2 text-sm">
              {serviceTypes.slice(0, 6).map((service) => (
                <li key={service}>
                  <Link 
                    href={`/diensten/${service.toLowerCase().replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-service-${service.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Meer Diensten</h3>
            <ul className="space-y-2 text-sm">
              {serviceTypes.slice(6).map((service) => (
                <li key={service}>
                  <Link 
                    href={`/diensten/${service.toLowerCase().replace(/ /g, "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-more-service-${service.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Bedrijfsinformatie</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Openingstijden</p>
                  <p>Ma t/m Za: 08.00 - 18.00</p>
                </div>
              </li>
              <li>
                <p className="font-medium text-foreground mb-1">KvK: 92210686</p>
              </li>
              <li>
                <Link href="/over-ons" className="hover:text-foreground transition-colors" data-testid="link-footer-about">
                  Over Ons
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lekvrijdak BV. Alle rechten voorbehouden.
          </p>
          <Link href="/admin/login">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="link-admin-login">
              Inloggen
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
