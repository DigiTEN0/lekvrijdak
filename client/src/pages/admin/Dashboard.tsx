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
import { LogOut, Mail, Phone, MapPin, Calendar, FileText } from "lucide-react";
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
    <div className="admin-dashboard min-h-screen bg-background">
      <header className="admin-header border-b bg-card sticky top-0 z-10">
        <div className="admin-header-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="admin-header-flex flex items-center justify-between">
            <div>
              <h1 className="admin-title font-heading text-2xl font-bold" data-testid="text-dashboard-title">
                Lekvrijdak Leads
              </h1>
              <p className="admin-subtitle text-sm text-muted-foreground">Beheer uw offerte aanvragen</p>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              data-testid="button-logout"
              className="admin-logout-button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <main className="admin-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="admin-card">
          <CardHeader className="admin-card-header">
            <CardTitle>Offerte Aanvragen ({quotes.length})</CardTitle>
          </CardHeader>
          <CardContent className="admin-card-content">
            {isLoading ? (
              <div className="admin-loading text-center py-12">
                <p className="text-muted-foreground">Laden...</p>
              </div>
            ) : quotes.length === 0 ? (
              <div className="admin-empty text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Geen offerte aanvragen gevonden</p>
              </div>
            ) : (
              <div className="admin-table-wrapper overflow-x-auto">
                <Table className="admin-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Datum</TableHead>
                      <TableHead>Klant</TableHead>
                      <TableHead>Dienst</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.id} data-testid={`row-quote-${quote.id}`} className="admin-row">
                        <TableCell className="font-medium">
                          {quote.createdAt
                            ? format(new Date(quote.createdAt), "dd MMM yyyy", { locale: nl })
                            : "-"}
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
                              className="w-40 admin-status-select"
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
