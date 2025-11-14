import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
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
import { Mail, Package, Loader2 } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Shipment = Tables<"shipments">;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingNotification, setSendingNotification] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Accès non autorisé");
        navigate("/auth");
        return;
      }

      const { data: roleData, error: roleError } = await (supabase as any)
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("Role check error:", roleError);
        toast.error("Erreur lors de la vérification des droits");
        navigate("/");
        return;
      }

      if (!roleData) {
        toast.error("Accès non autorisé - Administrateur uniquement");
        navigate("/");
        return;
      }

      fetchShipments();
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast.error("Erreur lors de la vérification des droits");
      navigate("/");
    }
  };

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error) {
      console.error("Error fetching shipments:", error);
      toast.error("Erreur lors du chargement des envois");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (shipmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("shipments")
        .update({ status: newStatus })
        .eq("id", shipmentId);

      if (error) throw error;

      toast.success("Statut mis à jour");
      fetchShipments();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const sendNotification = async (shipment: Shipment) => {
    setSendingNotification(shipment.id);
    
    try {
      const { error: functionError } = await supabase.functions.invoke("send-notification", {
        body: {
          email: shipment.sender_email,
          trackingNumber: shipment.tracking_number,
          deliveryLocation: shipment.delivery_location,
        },
      });

      if (functionError) throw functionError;

      toast.success("Email de notification envoyé!");
      fetchShipments();
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Erreur lors de l'envoi de l'email");
    } finally {
      setSendingNotification(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      arrived: "default",
      collected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
              <Package className="h-6 w-6" />
              Tableau de bord Administrateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">N° Suivi</TableHead>
                      <TableHead className="whitespace-nowrap">Expéditeur</TableHead>
                      <TableHead className="whitespace-nowrap hidden md:table-cell">Email</TableHead>
                      <TableHead className="whitespace-nowrap hidden lg:table-cell">Destination</TableHead>
                      <TableHead className="whitespace-nowrap">Statut</TableHead>
                      <TableHead className="whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {shipment.tracking_number}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{shipment.sender_name}</TableCell>
                        <TableCell className="hidden md:table-cell whitespace-nowrap">
                          {shipment.sender_email}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell whitespace-nowrap">
                          {shipment.delivery_location}
                        </TableCell>
                        <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(shipment.id, "arrived")}
                              disabled={shipment.status === "arrived"}
                              className="whitespace-nowrap"
                            >
                              Marquer arrivé
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => sendNotification(shipment)}
                              disabled={
                                sendingNotification === shipment.id ||
                                shipment.status !== "arrived"
                              }
                              className="whitespace-nowrap"
                            >
                              {sendingNotification === shipment.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Mail className="h-4 w-4 mr-1" />
                                  Notifier
                                </>
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            {shipments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucun envoi pour le moment
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
