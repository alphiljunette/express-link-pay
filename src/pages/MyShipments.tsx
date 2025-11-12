import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { Package, MapPin, Calendar, Hash } from "lucide-react";
import { toast } from "sonner";

interface Shipment {
  id: string;
  pickup_location: string;
  delivery_location: string;
  delivery_type: string;
  weight: number;
  estimated_price: number;
  status: string;
  tracking_number: string;
  created_at: string;
  sender_name: string;
}

const MyShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchShipments();
    };

    checkAuth();
  }, [navigate]);

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setShipments(data || []);
    } catch (error: any) {
      toast.error("Erreur lors du chargement des envois");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", variant: "secondary" as const },
      in_transit: { label: "En transit", variant: "default" as const },
      delivered: { label: "Livré", variant: "default" as const },
      cancelled: { label: "Annulé", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getDeliveryTypeLabel = (type: string) => {
    const types = {
      local: "Livraison locale",
      national: "Livraison nationale",
      international: "Livraison internationale",
    };
    return types[type as keyof typeof types] || type;
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Mes envois</h1>
            <p className="text-muted-foreground">Suivez tous vos colis en un seul endroit</p>
          </div>

          {shipments.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun envoi pour le moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {shipments.map((shipment) => (
                <Card key={shipment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          {getDeliveryTypeLabel(shipment.delivery_type)}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Hash className="h-4 w-4" />
                          {shipment.tracking_number}
                        </CardDescription>
                      </div>
                      {getStatusBadge(shipment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Point de collecte</p>
                            <p className="text-sm text-muted-foreground">{shipment.pickup_location}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-accent mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Destination</p>
                            <p className="text-sm text-muted-foreground">{shipment.delivery_location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Poids</p>
                          <p className="text-sm text-muted-foreground">{shipment.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Prix estimé</p>
                          <p className="text-sm text-accent font-bold">{shipment.estimated_price}€</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(shipment.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyShipments;
