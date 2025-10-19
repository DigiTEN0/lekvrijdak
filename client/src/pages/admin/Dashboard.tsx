import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Mail, Phone, MapPin, Calendar, FileText, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { Quote, quoteStatuses } from "@shared/schema";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      setLocation("/admin/login");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/quotes/${id}/status`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status bijgewerkt",
        description: "De status van de offerte is succesvol bijgewerkt",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Kon de status niet bijwerken",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/quotes/${id}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Verwijderd",
        description: "De offerte is succesvol verwijderd",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Kon de offerte niet verwijderen",
        variant: "destructive",
      });
    },
  });

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "Nieuw":
        return "default";
      case "In behandeling":
        return "secondary";
      case "Voltooid":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold" data-testid="text-dashboard-title">
                Lekvrijdak Leads
              </h1>
              <p className="text-sm text-muted-foreground">Beheer uw offerte aanvragen</p>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Offerte Aanvragen ({quotes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Laden...</p>
              </div>
            ) : quotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Geen offerte aanvragen gevonden</p>
              </div>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Datum</TableHead>
                        <TableHead>Klant</TableHead>
                        <TableHead>Dienst</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotes.map((quote) => (
                        <TableRow key={quote.id} data-testid={`row-quote-${quote.id}`}>
                          <TableCell className="font-medium">
                            {quote.createdAt ? format(new Date(quote.createdAt), "dd MMM yyyy", { locale: nl }) : "-"}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{quote.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {quote.postalCode}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{quote.serviceType}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <a href={`mailto:${quote.email}`} className="flex items-center gap-1 hover:text-primary">
                                <Mail className="h-3 w-3" />
                                {quote.email}
                              </a>
                              <a href={`tel:${quote.phone}`} className="flex items-center gap-1 hover:text-primary">
                                <Phone className="h-3 w-3" />
                                {quote.phone}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs space-y-1 text-sm">
                              {quote.typeOpdracht && (
                                <p><span className="font-medium">Type:</span> {quote.typeOpdracht}</p>
                              )}
                              {quote.typeWerkzaamheden && (
                                <p><span className="font-medium">Werkzaamheden:</span> {quote.typeWerkzaamheden}</p>
                              )}
                              {quote.aantalDakgoten && (
                                <p><span className="font-medium">Aantal goten:</span> {quote.aantalDakgoten}</p>
                              )}
                              {quote.lengteDakgoten && (
                                <p><span className="font-medium">Lengte:</span> {quote.lengteDakgoten}m</p>
                              )}
                              {quote.oppervlakte && (
                                <p><span className="font-medium">Oppervlakte:</span> {quote.oppervlakte}m²</p>
                              )}
                              {quote.uitvoerdatum && (
                                <p className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {quote.uitvoerdatum}
                                </p>
                              )}
                              <p className="text-muted-foreground italic mt-2">
                                "{quote.projectOmschrijving.substring(0, 100)}..."
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={quote.status}
                              onValueChange={(value) =>
                                updateStatusMutation.mutate({ id: quote.id, status: value })
                              }
                            >
                              <SelectTrigger 
                                className="w-40"
                                data-testid={`select-status-${quote.id}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {quoteStatuses.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  data-testid={`delete-quote-${quote.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Offerte verwijderen?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Weet u zeker dat u deze offerte wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteMutation.mutate(quote.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Verwijderen
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="md:hidden space-y-4">
                  {quotes.map((quote) => (
                    <Card key={quote.id} className="relative" data-testid={`card-quote-${quote.id}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{quote.name}</CardTitle>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" />
                              {quote.createdAt ? format(new Date(quote.createdAt), "dd MMM yyyy", { locale: nl }) : "-"}
                            </p>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                                data-testid={`delete-quote-mobile-${quote.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Offerte verwijderen?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Weet u zeker dat u deze offerte wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(quote.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Verwijderen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Badge variant="outline">{quote.serviceType}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span>{quote.postalCode}</span>
                          </div>
                          <a href={`mailto:${quote.email}`} className="flex items-center gap-2 hover:text-primary">
                            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{quote.email}</span>
                          </a>
                          <a href={`tel:${quote.phone}`} className="flex items-center gap-2 hover:text-primary">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span>{quote.phone}</span>
                          </a>
                        </div>

                        {(quote.typeOpdracht || quote.typeWerkzaamheden || quote.aantalDakgoten || quote.lengteDakgoten || quote.oppervlakte || quote.uitvoerdatum) && (
                          <div className="space-y-1 text-sm border-t pt-3">
                            {quote.typeOpdracht && (
                              <p><span className="font-medium">Type:</span> {quote.typeOpdracht}</p>
                            )}
                            {quote.typeWerkzaamheden && (
                              <p><span className="font-medium">Werkzaamheden:</span> {quote.typeWerkzaamheden}</p>
                            )}
                            {quote.aantalDakgoten && (
                              <p><span className="font-medium">Aantal goten:</span> {quote.aantalDakgoten}</p>
                            )}
                            {quote.lengteDakgoten && (
                              <p><span className="font-medium">Lengte:</span> {quote.lengteDakgoten}m</p>
                            )}
                            {quote.oppervlakte && (
                              <p><span className="font-medium">Oppervlakte:</span> {quote.oppervlakte}m²</p>
                            )}
                            {quote.uitvoerdatum && (
                              <p><span className="font-medium">Uitvoerdatum:</span> {quote.uitvoerdatum}</p>
                            )}
                          </div>
                        )}

                        <div className="border-t pt-3">
                          <p className="text-sm text-muted-foreground italic">
                            "{quote.projectOmschrijving}"
                          </p>
                        </div>

                        <div className="border-t pt-3">
                          <label className="text-sm font-medium mb-2 block">Status</label>
                          <Select
                            value={quote.status}
                            onValueChange={(value) =>
                              updateStatusMutation.mutate({ id: quote.id, status: value })
                            }
                          >
                            <SelectTrigger data-testid={`select-status-mobile-${quote.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {quoteStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
