import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteSchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

type AdvancedQuoteFormData = z.infer<typeof insertQuoteSchema>;

interface AdvancedQuoteFormProps {
  serviceType: string;
  onSubmit: (data: AdvancedQuoteFormData) => void;
  isPending?: boolean;
}

const typeOpdrachtOptions = [
  "Bitumen dak leggen",
  "Dakpannen leggen",
  "Kunststof / EPDM dak leggen",
  "Rieten dak leggen",
  "Zinken dak leggen",
  "Schoorsteen reparatie",
];

const typeWerkzaamhedenOptions = [
  "Nieuw dak plaatsen/vervangen",
  "Lekkages/reparatie",
];

const aantalDakgotenOptions = ["1", "2", "3", "4", "5", "6+"];

export function AdvancedQuoteForm({ serviceType, onSubmit, isPending }: AdvancedQuoteFormProps) {
  const form = useForm<AdvancedQuoteFormData>({
    resolver: zodResolver(insertQuoteSchema),
    defaultValues: {
      serviceType,
      name: "",
      email: "",
      phone: "",
      postalCode: "",
      typeOpdracht: "",
      typeWerkzaamheden: "",
      aantalDakgoten: "",
      lengteDakgoten: "",
      oppervlakte: "",
      uitvoerdatum: "",
      projectOmschrijving: "",
    },
  });

  const showTypeOpdracht = ["Dakdekken", "Schoorstenen"].includes(serviceType);
  const showDakgotenFields = serviceType === "Dakgoten";
  const showOppervlakteFields = ["Daklekkage", "Dakonderhoud", "Dakreparatie", "Dakpannen", "EPDM dakbedekking", "Platte daken", "Stormschade"].includes(serviceType);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Projectdetails</h3>
          
          {showTypeOpdracht && (
            <>
              <FormField
                control={form.control}
                name="typeOpdracht"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Type opdracht</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-type-opdracht">
                          <SelectValue placeholder="Selecteer type opdracht" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOpdrachtOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typeWerkzaamheden"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Type werkzaamheden</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        className="flex flex-col space-y-2"
                      >
                        {typeWerkzaamhedenOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={option} data-testid={`radio-${option.toLowerCase().replace(/\//g, "-").replace(/ /g, "-")}`} />
                            <label htmlFor={option} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {showDakgotenFields && (
            <>
              <FormField
                control={form.control}
                name="aantalDakgoten"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Aantal dakgoten</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger data-testid="select-aantal-dakgoten">
                          <SelectValue placeholder="Selecteer aantal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {aantalDakgotenOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lengteDakgoten"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Lengte van de dakgoten (in meters)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Bijvoorbeeld: 15" 
                        {...field} 
                        value={field.value || ""}
                        data-testid="input-lengte-dakgoten"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {showOppervlakteFields && (
            <FormField
              control={form.control}
              name="oppervlakte"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Oppervlakte van het dak (in m²)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Bijvoorbeeld: 50" 
                      {...field} 
                      value={field.value || ""}
                      data-testid="input-oppervlakte"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="uitvoerdatum"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Gewenste uitvoerdatum (indicatie)</FormLabel>
                <FormControl>
                  <Input 
                    type="date"
                    {...field} 
                    value={field.value || ""}
                    data-testid="input-uitvoerdatum"
                  />
                </FormControl>
                <FormDescription>
                  Dit is een indicatie, de exacte planning bespreken we telefonisch
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectOmschrijving"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Projectomschrijving</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Beschrijf in het kort uw project. Hoe gedetailleerder, hoe beter wij u kunnen adviseren en een passende offerte kunnen maken."
                    className="min-h-[120px]"
                    {...field}
                    data-testid="input-project-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Contactgegevens</h3>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Naam</FormLabel>
                <FormControl>
                  <Input placeholder="Uw volledige naam" {...field} data-testid="input-advanced-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mailadres</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="uw@email.nl" {...field} data-testid="input-advanced-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefoonnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="06 1234 5678" {...field} data-testid="input-advanced-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input placeholder="1234 AB" {...field} data-testid="input-advanced-postal-code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          disabled={isPending}
          data-testid="button-submit-advanced-quote"
        >
          {isPending ? "Offerte aanvraag verzenden..." : "Vraag Offerte Aan"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Door dit formulier in te dienen gaat u akkoord met het verwerken van uw gegevens voor het opstellen van een offerte.
        </p>
      </form>
    </Form>
  );
}
