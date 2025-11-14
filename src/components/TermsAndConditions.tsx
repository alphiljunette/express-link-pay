import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndConditions = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Conditions Générales</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veuillez lire attentivement nos conditions générales d'utilisation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-8">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-semibold mb-3">1. Acceptation des Conditions</h3>
                <p className="text-muted-foreground">
                  En utilisant les services d'ExpressDelivery, vous acceptez d'être lié par ces conditions générales. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">2. Services Proposés</h3>
                <p className="text-muted-foreground mb-2">
                  ExpressDelivery propose des services de livraison locale et internationale pour les particuliers et les entreprises. 
                  Nos services incluent :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Livraison express (24-48h)</li>
                  <li>Livraison standard (3-5 jours)</li>
                  <li>Livraison internationale (5-10 jours)</li>
                  <li>Suivi en temps réel</li>
                  <li>Assurance des envois</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">3. Tarification</h3>
                <p className="text-muted-foreground">
                  Les tarifs sont calculés en fonction du poids, des dimensions, de la destination et du type de service choisi. 
                  Un devis détaillé vous sera fourni avant la confirmation de votre envoi. Les prix affichés sont en euros TTC.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">4. Paiement</h3>
                <p className="text-muted-foreground">
                  Le paiement doit être effectué au moment de la création de l'envoi. Nous acceptons les cartes bancaires, 
                  PayPal et les virements bancaires. Tous les paiements sont sécurisés via Stripe.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">5. Responsabilité et Assurance</h3>
                <p className="text-muted-foreground mb-2">
                  ExpressDelivery s'engage à traiter vos colis avec le plus grand soin. Toutefois :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Tous les envois sont automatiquement assurés jusqu'à 100€</li>
                  <li>Une assurance supplémentaire peut être souscrite pour les articles de valeur</li>
                  <li>Les réclamations doivent être faites dans les 48h suivant la livraison</li>
                  <li>Nous ne sommes pas responsables des retards dus à des cas de force majeure</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">6. Articles Interdits</h3>
                <p className="text-muted-foreground mb-2">
                  Il est strictement interdit d'envoyer :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Matières dangereuses ou inflammables</li>
                  <li>Produits illégaux ou contrefaits</li>
                  <li>Armes et munitions</li>
                  <li>Denrées périssables sans emballage approprié</li>
                  <li>Argent liquide ou titres négociables</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">7. Délais de Livraison</h3>
                <p className="text-muted-foreground">
                  Les délais indiqués sont des estimations et ne constituent pas une garantie contractuelle. 
                  ExpressDelivery fera tous les efforts pour respecter ces délais, mais ne peut être tenu responsable 
                  des retards dus à des circonstances indépendantes de sa volonté.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">8. Annulation et Remboursement</h3>
                <p className="text-muted-foreground">
                  Vous pouvez annuler votre envoi gratuitement tant que le colis n'a pas été collecté. 
                  Après la collecte, des frais d'annulation de 30% s'appliquent. Les remboursements sont effectués 
                  sous 7 à 10 jours ouvrables.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">9. Protection des Données</h3>
                <p className="text-muted-foreground">
                  Vos données personnelles sont traitées conformément au RGPD. Nous ne partageons jamais vos informations 
                  avec des tiers sans votre consentement, sauf obligation légale. Vous disposez d'un droit d'accès, 
                  de rectification et de suppression de vos données.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">10. Modifications des Conditions</h3>
                <p className="text-muted-foreground">
                  ExpressDelivery se réserve le droit de modifier ces conditions à tout moment. 
                  Les modifications seront effectives dès leur publication sur notre site. Il est de votre responsabilité 
                  de consulter régulièrement ces conditions.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3">11. Contact</h3>
                <p className="text-muted-foreground">
                  Pour toute question concernant ces conditions générales, veuillez nous contacter à :
                  <br />
                  Email: contact@expressdelivery.com
                  <br />
                  Téléphone: +1 234 567 890
                  <br />
                  Adresse: 123 Delivery Street, Paris 75001, France
                </p>
              </section>

              <section className="pt-4 border-t">
                <p className="text-sm text-muted-foreground italic">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
