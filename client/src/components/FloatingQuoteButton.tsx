import { useState } from "react";
import { X, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteSchema, serviceTypes } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const quickQuoteSchema = insertQuoteSchema.pick({
  serviceType: true,
  name: true,
  email: true,
  phone: true,
  postalCode: true,
  projectOmschrijving: true,
});

type QuickQuoteFormData = z.infer<typeof quickQuoteSchema>;

export default function FloatingQuoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<QuickQuoteFormData>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      serviceType: "",
      name: "",
      email: "",
      phone: "",
      postalCode: "",
      projectOmschrijving: "",
    },
  });

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
      form.reset();
      setStep(1);
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of neem telefonisch contact op.",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setStep(1);
    form.reset();
  };

  const handleServiceSelect = (service: string) => {
    form.setValue("serviceType", service);
    setStep(2);
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger(["serviceType"]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-6 rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:pl-4 z-[60] group"
        style={{ writingMode: "vertical-rl" }}
        aria-label="Gratis Offerte Aanvragen"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 rotate-90" />
          <span className="font-semibold text-sm tracking-wide">GRATIS OFFERTE</span>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] transition-opacity"
            onClick={handleClose}
          />
          
          <div className="fixed left-0 top-0 bottom-0 w-full sm:w-[520px] bg-background shadow-2xl z-[80] transform transition-transform duration-300 overflow-y-auto">
            <div className="sticky top-0 bg-primary text-white px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold font-heading">Gratis Offerte Aanvragen</h2>
                <p className="text-sm text-white/90 mt-1">
                  Stap {step} van 2: {step === 1 ? "Kies uw dienst" : "Uw gegevens"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Sluiten"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submitQuote.mutate(data))} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Selecteer de dienst die u nodig heeft</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {serviceTypes.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleServiceSelect(service)}
                              className={`p-4 rounded-lg border-2 transition-all text-left hover:border-primary hover:bg-primary/5 ${
                                form.watch("serviceType") === service
                                  ? "border-primary bg-primary/10"
                                  : "border-border"
                              }`}
                            >
                              <span className="font-medium text-sm">{service}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={() => (
                          <FormItem className="hidden">
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                        <p className="text-sm">
                          <span className="font-medium">Gekozen dienst:</span>{" "}
                          <span className="text-primary font-semibold">{form.watch("serviceType")}</span>
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Naam</FormLabel>
                            <FormControl>
                              <Input placeholder="Uw naam" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="uw@email.nl" {...field} />
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
                              <FormLabel>Telefoon</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="06 1234 5678" {...field} />
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
                              <Input placeholder="1234 AB" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectOmschrijving"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Beschrijving</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Beschrijf kort uw project..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Terug
                        </Button>
                        <Button
                          type="submit"
                          disabled={submitQuote.isPending}
                          className="flex-1"
                        >
                          {submitQuote.isPending ? "Verzenden..." : "Verstuur Aanvraag"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
