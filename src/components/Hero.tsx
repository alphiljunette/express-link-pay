import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";

const Hero = () => {
  const scrollToQuote = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-8 h-8 text-accent" />
              <span className="text-accent font-semibold">Livraison Express</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-primary-foreground leading-tight">
              Livraison de Colis <span className="text-accent">Rapide & Fiable</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Envoyez vos colis partout dans le monde avec notre service de livraison express. 
              Local ou international, nous garantissons la sécurité et la rapidité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={scrollToQuote}
                className="text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Obtenir un devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              >
                Nos Services
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-primary-foreground/80">Service client</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">+150</div>
                <div className="text-sm text-primary-foreground/80">Pays couverts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">99%</div>
                <div className="text-sm text-primary-foreground/80">Livraisons réussies</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Livreur professionnel avec colis" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Suivi en temps réel</div>
                  <div className="text-sm text-muted-foreground">Tracking GPS inclus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
