import { Link } from "wouter";
import { ArrowRight, Check, Star, ChevronDown, Home as HomeIcon, Droplets, Wrench, Settings, Hammer, Zap, Square, Building2, Factory, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuickQuoteForm } from "@/components/QuickQuoteForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Roofing_contractor_at_work_b234ed6e.png";

const services = [
  {
    name: "Dakdekken",
    description: "Professioneel nieuw dak plaatsen of vervangen met hoogwaardige materialen",
    Icon: HomeIcon,
  },
  {
    name: "Dakgoten",
    description: "Installatie, reparatie en reiniging van dakgoten voor optimale waterafvoer",
    Icon: Droplets,
  },
  {
    name: "Daklekkage",
    description: "Snelle opsporing en reparatie van lekkages om waterschade te voorkomen",
    Icon: Wrench,
  },
  {
    name: "Dakonderhoud",
    description: "Regelmatig onderhoud voor een langere levensduur van uw dak",
    Icon: Settings,
  },
  {
    name: "Dakpannen",
    description: "Vervangen en repareren van beschadigde of versleten dakpannen",
    Icon: Hammer,
  },
  {
    name: "Dakreparatie",
    description: "Alle soorten dakreparaties snel en vakkundig uitgevoerd",
    Icon: Zap,
  },
  {
    name: "EPDM dakbedekking",
    description: "Duurzame rubber dakbedekking voor platte daken",
    Icon: Square,
  },
  {
    name: "Platte daken",
    description: "Specialisten in alle aspecten van platte daken",
    Icon: Building2,
  },
  {
    name: "Schoorstenen",
    description: "Onderhoud en reparatie van schoorstenen en rookkanalen",
    Icon: Factory,
  },
  {
    name: "Stormschade",
    description: "Snelle hulp bij acute stormschade aan uw dak",
    Icon: Wind,
  },
];

const reviews = [
  {
    name: "Jan van der Berg",
    location: "Amsterdam",
    rating: 5,
    text: "Zeer professioneel werk geleverd. Ons dak is perfect gerepareerd en het team was netjes en punctueel. Absoluut een aanrader!",
  },
  {
    name: "Maria de Vries",
    location: "Rotterdam",
    rating: 5,
    text: "Uitstekende service! De dakgoten zijn vakkundig vervangen en de prijs was eerlijk. Lekvrijdak denkt mee in oplossingen.",
  },
  {
    name: "Piet Janssen",
    location: "Utrecht",
    rating: 5,
    text: "Snelle reactie op onze lekkage en binnen een dag was het probleem opgelost. Goede communicatie en kwaliteit werk.",
  },
  {
    name: "Sophie Bakker",
    location: "Den Haag",
    rating: 5,
    text: "Ons platte dak is voorzien van nieuwe EPDM bedekking. Het ziet er geweldig uit en we zijn zeer tevreden met het resultaat.",
  },
  {
    name: "Tom Vermeer",
    location: "Eindhoven",
    rating: 5,
    text: "Na stormschade heeft Lekvrijdak ons dak snel en vakkundig hersteld. Fijn dat ze ook bij acute problemen direct beschikbaar zijn.",
  },
  {
    name: "Lisa Hendriksen",
    location: "Haarlem",
    rating: 5,
    text: "Complete dakvernieuwing met dakpannen. Mooi afgewerkt en het team was zeer vriendelijk en schoon in hun werk.",
  },
];

const faqs = [
  {
    question: "Hoe snel kan Lekvrijdak bij mij langskomen?",
    answer: "Voor spoedeisende reparaties zoals lekkages of stormschade proberen we binnen 24 uur ter plaatse te zijn. Voor reguliere werkzaamheden plannen we meestal binnen 3-5 werkdagen een afspraak in.",
  },
  {
    question: "Krijg ik garantie op het uitgevoerde werk?",
    answer: "Ja, alle werkzaamheden worden uitgevoerd met garantie. De garantieperiode is afhankelijk van het type werkzaamheden, maar varieert meestal tussen 5 en 10 jaar op materiaal en vakmanschap.",
  },
  {
    question: "Wat kost een daklekkage reparatie?",
    answer: "De kosten zijn afhankelijk van de oorzaak en omvang van de lekkage. Na een inspectie kunnen wij u een passende offerte maken. Kleine reparaties starten vaak al vanaf €150,-, maar voor een exacte prijs vragen wij u een offerte aan te vragen.",
  },
  {
    question: "Werken jullie ook in mijn regio?",
    answer: "Lekvrijdak werkt door heel Nederland. Vul uw postcode in bij de offerte aanvraag en wij nemen contact met u op om de mogelijkheden te bespreken.",
  },
  {
    question: "Moet ik zelf materialen aanschaffen?",
    answer: "Nee, wij verzorgen alle benodigde materialen. We werken alleen met hoogwaardige merken en materialen om de beste kwaliteit te garanderen.",
  },
  {
    question: "Hoe lang duurt een gemiddelde dakreparatie?",
    answer: "De duur is afhankelijk van het type werkzaamheden. Kleine reparaties kunnen vaak binnen een dag worden afgerond, terwijl een complete dakvernieuwing 3-7 werkdagen kan duren.",
  },
  {
    question: "Kunnen jullie ook preventief onderhoud uitvoeren?",
    answer: "Absoluut! Preventief onderhoud is zeer belangrijk voor de levensduur van uw dak. Wij bieden onderhoudscontracten aan waarbij we jaarlijks uw dak inspecteren en klein onderhoud uitvoeren.",
  },
  {
    question: "Zijn de medewerkers van Lekvrijdak gecertificeerd?",
    answer: "Ja, al onze dakdekkers zijn vakbekwaam en beschikken over de benodigde certificeringen. We voldoen aan alle veiligheidseisen en werken conform de geldende normen.",
  },
];

export default function Home() {
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
    },
    onError: () => {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of neem telefonisch contact op.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen">
      <section 
        id="offerte"
        className="relative bg-gradient-to-br from-primary/95 to-primary py-16 lg:py-24 overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
                Uw Specialist in Professioneel Dakwerk
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90">
                Van dakdekken tot dakreparatie - Vakmanschap en kwaliteit gegarandeerd
              </p>
              <ul className="space-y-3 mb-8">
                {["24/7 bereikbaar voor noodgevallen", "Meer dan 15 jaar ervaring", "Gratis offerte & advies", "Vakbekwame & gecertificeerde specialisten"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-1">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+31612466941">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto" data-testid="button-hero-call">
                    Bel Direct: +31 6 1246 6941
                  </Button>
                </a>
              </div>
            </div>

            <Card className="bg-card/95 backdrop-blur shadow-2xl" data-testid="card-quick-quote">
              <CardContent className="p-6 lg:p-8">
                <h2 className="font-heading text-2xl font-semibold mb-2">Vraag Gratis Offerte Aan</h2>
                <p className="text-muted-foreground mb-6">Vul het formulier in en ontvang binnen 24 uur een vrijblijvende offerte</p>
                <QuickQuoteForm 
                  onSubmit={(data) => submitQuote.mutate(data)} 
                  isPending={submitQuote.isPending}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4" data-testid="text-services-title">
              Onze Diensten
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialist in alle soorten dakwerkzaamheden. Klik op een dienst voor meer informatie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link 
                key={service.name} 
                href={`/diensten/${service.name.toLowerCase().replace(/ /g, "-")}`}
                data-testid={`link-service-${service.name.toLowerCase().replace(/ /g, "-")}`}
              >
                <Card className="h-full hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-service-${service.name.toLowerCase().replace(/ /g, "-")}`}>
                  <CardContent className="p-6">
                    <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center text-primary font-medium">
                      Meer info
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4" data-testid="text-reviews-title">
              Wat Onze Klanten Zeggen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ontdek waarom honderden klanten ons vertrouwen voor hun dakwerkzaamheden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="h-full" data-testid={`card-review-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[hsl(45,95%,55%)] text-[hsl(45,95%,55%)]" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">"{review.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4" data-testid="text-faq-title">
              Veelgestelde Vragen
            </h2>
            <p className="text-lg text-muted-foreground">
              Antwoorden op de meest gestelde vragen over onze diensten
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border rounded-lg px-6"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger 
                  className="text-left font-semibold hover:no-underline"
                  data-testid={`button-faq-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4">
            Klaar om te Beginnen?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Vraag vandaag nog een gratis offerte aan en laat ons u adviseren over de beste oplossing voor uw dak
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#offerte">
              <Button size="lg" variant="secondary" data-testid="button-cta-quote">
                Gratis Offerte Aanvragen
              </Button>
            </a>
            <a href="tel:+31612466941">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
                data-testid="button-cta-call"
              >
                Bel: +31 6 1246 6941
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
