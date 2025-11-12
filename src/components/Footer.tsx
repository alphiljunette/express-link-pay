import { Package, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">ExpressDelivery</span>
            </div>
            <p className="text-background/80">
              Votre partenaire de confiance pour la livraison de colis locale et internationale.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-background/80">
              <li>Livraison Locale</li>
              <li>Livraison Express</li>
              <li>Livraison Internationale</li>
              <li>Suivi de colis</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Entreprise</h3>
            <ul className="space-y-2 text-background/80">
              <li>À propos</li>
              <li>Nos tarifs</li>
              <li>FAQ</li>
              <li>Conditions générales</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@expressdelivery.fr</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/80">
          <p>&copy; {new Date().getFullYear()} ExpressDelivery. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
