import { CreditCard, Smartphone, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentMethods = () => {
  const methods = [
    {
      icon: CreditCard,
      name: "Cartes Bancaires",
      description: "Visa, Mastercard, American Express"
    },
    {
      icon: Smartphone,
      name: "PayPal",
      description: "Paiement rapide et sécurisé"
    },
    {
      icon: Building2,
      name: "Virement Bancaire",
      description: "Pour les entreprises"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Modes de Paiement</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Payez en toute sécurité avec votre méthode préférée. Tous les paiements sont cryptés et sécurisés.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.name}</h3>
                <p className="text-muted-foreground text-sm">{method.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-card p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">Paiements 100% Sécurisés</h3>
          <p className="text-muted-foreground mb-6">
            Vos informations de paiement sont cryptées avec la technologie SSL et traitées via Stripe, 
            le leader mondial des paiements en ligne. Nous ne stockons jamais vos données bancaires.
          </p>
          <div className="flex justify-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
              alt="Stripe" 
              className="h-8 opacity-70"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
