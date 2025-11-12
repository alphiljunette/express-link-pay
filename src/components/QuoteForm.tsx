import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calculator } from "lucide-react";

const QuoteForm = () => {
  const { toast } = useToast();
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!deliveryType || !weight) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    const weightNum = parseFloat(weight);
    let basePrice = deliveryType === "local" ? 10 : 50;
    let pricePerKg = deliveryType === "local" ? 2 : 15;
    
    const total = basePrice + (weightNum * pricePerKg);
    setEstimatedPrice(total);
    
    toast({
      title: "Devis calculé !",
      description: `Prix estimé : ${total.toFixed(2)} €`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePrice();
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
              Obtenez un devis instantané pour votre livraison
            </p>
          </div>

          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Lieu de ramassage</Label>
                  <Input 
                    id="pickup" 
                    placeholder="Ville ou adresse" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery">Lieu de livraison</Label>
                  <Input 
                    id="delivery" 
                    placeholder="Ville ou adresse" 
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
                      <SelectItem value="local">Locale (même pays)</SelectItem>
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
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre@email.com" 
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
                  required 
                />
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

              <Button type="submit" size="lg" className="w-full text-lg">
                Calculer le prix
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
