import { Card } from "@/components/ui/card";
import { Package, MapPin, Truck, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Package,
      title: "1. Demandez un devis",
      description: "Remplissez notre formulaire avec les détails de votre envoi"
    },
    {
      icon: MapPin,
      title: "2. Ramassage",
      description: "Nous récupérons votre colis à l'adresse indiquée"
    },
    {
      icon: Truck,
      title: "3. Transport",
      description: "Votre colis est acheminé en toute sécurité avec suivi en temps réel"
    },
    {
      icon: CheckCircle,
      title: "4. Livraison",
      description: "Réception confirmée avec preuve de livraison"
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et efficace en 4 étapes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
