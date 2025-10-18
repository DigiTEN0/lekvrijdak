import { Phone, Mail, Clock, Award, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4" data-testid="text-about-title">
            Over Lekvrijdak
          </h1>
          <p className="text-xl text-muted-foreground">
            Uw betrouwbare partner voor professioneel dakwerk
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Lekvrijdak BV is een gerenommeerd dakdekkersbedrijf dat zich al jaren inzet voor vakkundig en betrouwbaar dakwerk. 
            Met een team van ervaren en gecertificeerde specialisten bieden wij een breed scala aan diensten, van nieuwbouw tot 
            renovatie en onderhoud.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            Of het nu gaat om het plaatsen van een nieuw dak, het repareren van lekkages, het vervangen van dakgoten of het 
            uitvoeren van spoedreparaties na stormschade - wij staan voor u klaar. Onze werkwijze kenmerkt zich door 
            persoonlijke aandacht, vakmanschap en eerlijke prijzen.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Bij Lekvrijdak werken we uitsluitend met hoogwaardige materialen en moderne technieken. Zo garanderen we dat uw 
            dak niet alleen mooi afgewerkt is, maar ook jarenlang meegaat. Kwaliteit en klanttevredenheid staan bij ons 
            centraal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">15+ Jaar Ervaring</h3>
              <p className="text-muted-foreground text-sm">
                Ruime ervaring in alle soorten dakwerkzaamheden
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Vakbekwaam Team</h3>
              <p className="text-muted-foreground text-sm">
                Gecertificeerde specialisten met passie voor het vak
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Garantie & Zekerheid</h3>
              <p className="text-muted-foreground text-sm">
                Garantie op al onze werkzaamheden en materialen
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="p-8">
            <h2 className="font-heading text-2xl font-semibold mb-6">Contact & Openingstijden</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Telefoon</p>
                    <a href="tel:+31612466941" className="text-primary hover:underline" data-testid="link-about-phone">
                      +31 6 1246 6941
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <a href="mailto:info@lekvrijdak.nl" className="text-primary hover:underline" data-testid="link-about-email">
                      info@lekvrijdak.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">KvK-nummer</p>
                    <p className="text-muted-foreground">92210686</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium mb-2">Openingstijden</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Maandag t/m Zaterdag</p>
                    <p className="font-semibold text-foreground">08:00 - 18:00 uur</p>
                    <p className="text-sm mt-2">24/7 bereikbaar voor noodgevallen</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h2 className="font-heading text-2xl font-semibold mb-4">Heeft u een vraag?</h2>
          <p className="text-muted-foreground mb-6">
            Neem gerust contact met ons op of vraag direct een gratis offerte aan
          </p>
          <Link href="/#offerte">
            <Button size="lg" data-testid="button-about-quote">
              Vraag Gratis Offerte Aan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
