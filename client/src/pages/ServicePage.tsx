import { CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdvancedQuoteForm } from "@/components/AdvancedQuoteForm";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import roofTilesImage from "@assets/generated_images/Professional_roof_tiles_close-up_01e97d01.png";
import gutterImage from "@assets/generated_images/Clean_gutter_system_installation_7959d966.png";
import epdmImage from "@assets/generated_images/EPDM_flat_roof_installation_14c4c0d2.png";

interface ServicePageProps {
  title: string;
  description: string;
  benefits: string[];
  image?: string;
}

export default function ServicePage({ title, description, benefits, image }: ServicePageProps) {
  const { toast } = useToast();

  const submitQuote = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/quotes", data);
    },
    onSuccess: () => {
      toast({
        title: "Offerte aanvraag verzonden!",
        description: "We nemen zo spoedig mogelijk contact met u op.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of neem telefonisch contact op.",
        variant: "destructive",
      });
    },
  });

  const defaultImage = title.includes("Dakgoten") ? gutterImage : 
                       title.includes("EPDM") || title.includes("Platte") ? epdmImage : 
                       roofTilesImage;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back-home">
                ← Terug naar overzicht
              </Button>
            </Link>
            
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6" data-testid="text-service-title">
              {title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {description}
            </p>

            <div className="mb-8">
              <h2 className="font-semibold text-xl mb-4">Waarom kiezen voor Lekvrijdak?</h2>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <img 
              src={image || defaultImage}
              alt={title}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <Card className="shadow-xl">
              <CardContent className="p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-semibold mb-2">Vraag Offerte Aan</h2>
                  <p className="text-muted-foreground">
                    Vul onderstaand formulier in voor een vrijblijvende offerte op maat
                  </p>
                </div>

                <AdvancedQuoteForm 
                  serviceType={title}
                  onSubmit={(data) => submitQuote.mutate(data)}
                  isPending={submitQuote.isPending}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="font-heading text-2xl font-semibold mb-3">
            Heeft u vragen over {title.toLowerCase()}?
          </h2>
          <p className="text-lg mb-6 text-primary-foreground/90">
            Neem direct contact met ons op voor advies of een spoedreparatie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+31612466941">
              <Button size="lg" variant="secondary" data-testid="button-service-call">
                Bel: +31 6 1246 6941
              </Button>
            </a>
            <a href="mailto:info@lekvrijdak.nl">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
                data-testid="button-service-email"
              >
                E-mail ons
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
