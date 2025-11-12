import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Livraison Locale",
      price: "10",
      unit: "base + 2€/kg",
      description: "Parfait pour les envois locaux",
      features: [
        "Livraison en 24-48h",
        "Suivi en temps réel",
        "Support client 7j/7",
        "Assurance de base",
        "Emballage standard"
      ],
      color: "primary"
    },
    {
      name: "Livraison Express",
      price: "25",
      unit: "base + 5€/kg",
      description: "Livraison le jour même",
      features: [
        "Livraison en 4-6h",
        "Suivi GPS en direct",
        "Support prioritaire",
        "Assurance premium",
        "Emballage renforcé",
        "Photo de livraison"
      ],
      color: "accent",
      popular: true
    },
    {
      name: "International",
      price: "50",
      unit: "base + 15€/kg",
      description: "Pour vos envois à l'étranger",
      features: [
        "Livraison 3-7 jours",
        "Dédouanement inclus",
        "Support multilingue",
        "Assurance internationale",
        "Documents de douane",
        "Tracking mondial"
      ],
      color: "primary"
    }
  ];

  const scrollToQuote = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Tarifs Transparents
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez la formule adaptée à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative p-8 hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'border-2 border-accent shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Populaire
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className={`text-5xl font-bold ${plan.color === 'accent' ? 'text-accent' : 'text-primary'}`}>
                    {plan.price}€
                  </span>
                </div>
                <div className="text-muted-foreground text-sm">{plan.unit}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 ${plan.color === 'accent' ? 'text-accent' : 'text-primary'} flex-shrink-0 mt-0.5`} />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={scrollToQuote}
                className={`w-full ${plan.color === 'accent' ? 'bg-accent hover:bg-accent/90' : ''}`}
                variant={plan.color === 'accent' ? 'default' : 'outline'}
              >
                Obtenir un devis
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
