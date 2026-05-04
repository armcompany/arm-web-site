import { Resend } from "resend";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const { nome, email, assunto, mensagem } = req.body;
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "contato@armbuilds.com";
    const toEmail = process.env.TO_EMAIL || "armbuildscompany@gmail.com";

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Email inválido",
      });
    }

    if (!resendApiKey) {
      console.error("RESEND_API_KEY não configurada");
      return res.status(500).json({
        message: "Serviço de email não configurado",
      });
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Novo contato: ${assunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Novo Contato - Arm Co. Development</h1>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="margin-bottom: 20px;">
              <strong style="color: #495057;">Nome:</strong>
              <p style="margin: 5px 0; color: #212529;">${nome}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <strong style="color: #495057;">Email:</strong>
              <p style="margin: 5px 0; color: #212529;">${email}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <strong style="color: #495057;">Assunto:</strong>
              <p style="margin: 5px 0; color: #212529;">${assunto}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <strong style="color: #495057;">Mensagem:</strong>
              <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; margin-top: 10px;">
                <p style="margin: 0; color: #212529; line-height: 1.6;">${mensagem.replace(
                  /\n/g,
                  "<br>",
                )}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                Enviado através do site da Arm Co. Development
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Erro do Resend:", error);
      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }

    const { error: confirmationError } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "Confirmação de recebimento - Arm Development",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Arm Development</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Inovação em IA e Web3</p>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #495057; margin-top: 0;">Olá, ${nome}!</h2>

            <p style="color: #212529; line-height: 1.6;">
              Recebemos sua mensagem e agradecemos o seu contato. Nossa equipe analisará sua solicitação e retornará em breve.
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
              <h3 style="color: #495057; margin-top: 0;">Resumo da sua mensagem:</h3>
              <p style="margin: 5px 0; color: #212529;"><strong>Assunto:</strong> ${assunto}</p>
              <p style="margin: 5px 0; color: #6c757d;">${mensagem}</p>
            </div>

            <p style="color: #212529; line-height: 1.6;">
              <strong>Tempo de resposta esperado:</strong> 24-48 horas úteis
            </p>

            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0; line-height: 1.6;">
                <strong>Arm Development</strong><br>
                Fluxos seguros, ideias autônomas, arquiteturas AI First.
              </p>
            </div>

            <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 14px;">
              <p>📍 Rua Luiz Boza, 488, Santa Felicidade, Curitiba/PR</p>
              <p>📞 +55 (41) 99815-7368 | ✉️ contato@armbuilds.com</p>
            </div>
          </div>
        </div>
      `,
    });

    if (confirmationError) {
      console.error("Erro ao enviar confirmação automática:", confirmationError);
    }

    return res.status(200).json({
      message: "Mensagem enviada com sucesso!",
      id: data?.id,
    });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
