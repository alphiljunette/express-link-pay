import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  email: string;
  trackingNumber: string;
  deliveryLocation: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, trackingNumber, deliveryLocation }: NotificationRequest = await req.json();

    console.log("Sending notification email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Express Link Pay <onboarding@resend.dev>",
      to: [email],
      subject: `Votre colis ${trackingNumber} est arrivé!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Votre colis est arrivé!</h1>
          <p>Bonjour,</p>
          <p>Nous avons le plaisir de vous informer que votre colis avec le numéro de suivi <strong>${trackingNumber}</strong> est arrivé à destination.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1f2937; margin-top: 0;">Détails de récupération</h2>
            <p><strong>Lieu de récupération:</strong> ${deliveryLocation}</p>
            <p><strong>Numéro de suivi:</strong> ${trackingNumber}</p>
          </div>
          <p>Vous pouvez maintenant venir récupérer votre colis à notre agence pendant nos heures d'ouverture.</p>
          <p><strong>Heures d'ouverture:</strong></p>
          <ul>
            <li>Lundi - Vendredi: 8h00 - 18h00</li>
            <li>Samedi: 9h00 - 16h00</li>
            <li>Dimanche: Fermé</li>
          </ul>
          <p>N'oubliez pas d'apporter une pièce d'identité lors de la récupération.</p>
          <p>Cordialement,<br><strong>L'équipe Express Link Pay</strong></p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
