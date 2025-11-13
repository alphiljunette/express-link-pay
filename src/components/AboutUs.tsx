import { Building2, Users, Award, Target } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: Target,
      title: "Notre Mission",
      description: "Faciliter vos livraisons avec un service rapide, fiable et abordable partout dans le monde."
    },
    {
      icon: Users,
      title: "Notre Équipe",
      description: "Une équipe dédiée de professionnels passionnés par l'excellence du service client."
    },
    {
      icon: Award,
      title: "Notre Engagement",
      description: "Garantir la sécurité et la ponctualité de chaque livraison, sans compromis sur la qualité."
    },
    {
      icon: Building2,
      title: "Notre Expérience",
      description: "Plus de 10 ans d'expertise dans le secteur de la livraison express et internationale."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">À Propos de Nous</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ExpressDelivery est votre partenaire de confiance pour tous vos besoins de livraison, 
            que ce soit au niveau local ou international.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Notre Histoire</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Fondée en 2014, ExpressDelivery est née de la volonté de révolutionner le secteur 
            de la livraison en offrant un service transparent, efficace et accessible à tous. 
            Ce qui a commencé comme une petite entreprise locale s'est transformé en un réseau 
            international couvrant plus de 50 pays.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Aujourd'hui, nous sommes fiers de servir des milliers de clients satisfaits chaque jour, 
            en livrant leurs colis avec soin et professionnalisme. Notre engagement envers l'innovation 
            et la satisfaction client reste au cœur de tout ce que nous faisons.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
