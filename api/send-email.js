import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, project } = req.body;

  if (!name || !email || !project) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Laprodu Web <onboarding@resend.dev>', // Resend default for unverified domains, or custom domain if verified
      to: 'produccion@laprodufilms.com',
      replyTo: email,
      subject: `Nuevo proyecto de ${name} - Laprodu Films`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #24231f; max-width: 600px; border: 1px solid #EAEAEA;">
          <h2 style="border-b: 1px solid #EAEAEA; padding-bottom: 10px; font-weight: 700; font-size: 20px; color: #111111;">Nuevo contacto desde la Web</h2>
          <p style="margin: 15px 0;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin: 15px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8C4F3B; text-decoration: underline;">${email}</a></p>
          <div style="margin-top: 20px; padding: 15px; background-color: #FBFBFA; border-left: 4px solid #8C4F3B;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Descripción del proyecto:</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #5E5A52;">${project}</p>
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #787774; border-top: 1px solid #EAEAEA; padding-top: 10px;">
            Este correo ha sido enviado automáticamente desde el formulario de contacto de Laprodu Films.
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
