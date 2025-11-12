import { Card } from "@/components/ui/card";
import { Package, Plane, Clock, Shield } from "lucide-react";
import localDeliveryImg from "@/assets/local-delivery.png";
import internationalDeliveryImg from "@/assets/international-delivery.png";

const Services = () => {
  const services = [
    {
      icon: Package,
      title: "Livraison Locale",
      description: "Service rapide dans votre ville ou région",
      image: localDeliveryImg,
      features: ["Livraison en 24h", "Tarifs avantageux", "Suivi en temps réel"],
      color: "primary"
    },
    {
      icon: Plane,
      title: "Livraison Internationale",
      description: "Expédition vers plus de 150 pays",
      image: internationalDeliveryImg,
      features: ["Dédouanement inclus", "Assurance complète", "Délais garantis"],
      color: "accent"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Rapidité",
      description: "Des délais de livraison respectés et garantis"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Assurance tous risques sur tous vos envois"
    }
  ];

  return (
    <section className="py-20 bg-secondary" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Nos Services de Livraison
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Solutions complètes pour tous vos besoins d'expédition
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-primary">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${service.color === 'primary' ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>
                    <service.icon className={`w-6 h-6 ${service.color === 'primary' ? 'text-primary-foreground' : 'text-accent-foreground'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground">
                      <div className={`w-2 h-2 rounded-full ${service.color === 'primary' ? 'bg-primary' : 'bg-accent'}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
