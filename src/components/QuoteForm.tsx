import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calculator, CreditCard, Smartphone, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const QuoteForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const calculatePrice = () => {
    if (!deliveryType || !weight) {
      toast.error("Veuillez remplir tous les champs requis");
      return null;
    }

    const weightNum = parseFloat(weight);
    let basePrice = deliveryType === "local" ? 10 : deliveryType === "national" ? 30 : 50;
    let pricePerKg = deliveryType === "local" ? 2 : deliveryType === "national" ? 5 : 15;
    
    const total = basePrice + (weightNum * pricePerKg);
    setEstimatedPrice(total);
    
    toast.success(`Prix estimé : ${total.toFixed(2)} €`);
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Vous devez être connecté pour créer un envoi");
      navigate("/auth");
      return;
    }

    const price = calculatePrice();
    if (!price) return;

    setSaving(true);

    try {
      const { error } = await supabase.from("shipments").insert({
        user_id: user.id,
        pickup_location: pickupLocation,
        delivery_location: deliveryLocation,
        delivery_type: deliveryType,
        weight: parseFloat(weight),
        estimated_price: price,
        sender_name: senderName,
        sender_email: senderEmail,
        sender_phone: senderPhone,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Votre demande d'envoi a été enregistrée!");
      navigate("/my-shipments");
    } catch (error: any) {
      toast.error("Erreur lors de l'enregistrement");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-20 bg-background" id="quote-form">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="w-8 h-8 text-primary" />
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Calculer votre Devis
              </h2>
            </div>
            <p className="text-xl text-muted-foreground">
              Obtenez un devis instantané pour le transport de votre colis entre nos agences
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Agence de dépôt (ville)</Label>
                  <Input 
                    id="pickup" 
                    placeholder="Ville de dépôt" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery">Agence de destination (ville)</Label>
                  <Input 
                    id="delivery" 
                    placeholder="Ville de destination" 
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Type de livraison</Label>
                  <Select value={deliveryType} onValueChange={setDeliveryType} required>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Locale</SelectItem>
                      <SelectItem value="national">Nationale</SelectItem>
                      <SelectItem value="international">Internationale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    step="0.1"
                    placeholder="Ex: 2.5" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    placeholder="Votre nom" 
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+33 6 12 34 56 78" 
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  required 
                />
              </div>

              <div className="space-y-4 p-6 bg-muted/30 rounded-lg border">
                <Label className="text-lg font-semibold">Mode de paiement</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Carte Bancaire</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-muted-foreground">Paiement rapide et sécurisé</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Virement Bancaire</div>
                        <div className="text-sm text-muted-foreground">Pour les entreprises</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {estimatedPrice !== null && (
                <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary animate-fade-in">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Prix estimé</div>
                    <div className="text-4xl font-bold text-primary">{estimatedPrice.toFixed(2)} €</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Prix final confirmé après vérification
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 text-lg" 
                  onClick={calculatePrice}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculer le prix
                </Button>
                <Button type="submit" size="lg" className="flex-1 text-lg" disabled={saving || !user}>
                  {saving ? "Enregistrement..." : "Créer l'envoi"}
                </Button>
              </div>
              {!user && (
                <p className="text-sm text-muted-foreground text-center">
                  Connectez-vous pour créer un envoi
                </p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
