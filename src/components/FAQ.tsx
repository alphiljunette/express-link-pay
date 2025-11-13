import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Quels sont vos délais de livraison ?",
      answer: "Nos délais varient selon le type de service choisi : 24-48h pour la livraison express locale, 3-5 jours pour la livraison standard, et 5-10 jours pour l'international. Les délais exacts sont calculés lors de votre devis."
    },
    {
      question: "Comment puis-je suivre mon colis ?",
      answer: "Après avoir créé votre envoi et vous être connecté, vous recevrez un numéro de suivi unique. Vous pouvez suivre votre colis en temps réel dans la section 'Mes Envois' de votre compte."
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés via Stripe."
    },
    {
      question: "Que se passe-t-il si mon colis est endommagé ?",
      answer: "Tous nos envois sont assurés. En cas de dommage, contactez notre service client dans les 48h avec des photos. Nous traiterons votre réclamation rapidement et vous proposerons un remboursement ou un renvoi."
    },
    {
      question: "Puis-je modifier mon adresse de livraison après l'envoi ?",
      answer: "Oui, vous pouvez modifier l'adresse de livraison tant que le colis n'est pas en transit. Connectez-vous à votre compte et modifiez les informations dans 'Mes Envois'. Des frais peuvent s'appliquer."
    },
    {
      question: "Proposez-vous la livraison internationale ?",
      answer: "Oui, nous livrons dans plus de 50 pays à travers le monde. Les tarifs et délais varient selon la destination. Utilisez notre calculateur pour obtenir un devis précis."
    },
    {
      question: "Y a-t-il des restrictions sur les articles que je peux envoyer ?",
      answer: "Nous n'acceptons pas les matières dangereuses, les produits illégaux, les denrées périssables sans emballage approprié, ou les articles d'une valeur supérieure à 10 000€ sans assurance spéciale."
    },
    {
      question: "Comment obtenir une facture ?",
      answer: "Une facture électronique vous est automatiquement envoyée par email après chaque paiement. Vous pouvez également la télécharger depuis votre espace client dans la section 'Mes Envois'."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos services de livraison.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
