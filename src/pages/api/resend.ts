import type { APIRoute } from "astro";
import { Resend } from "resend";
import { clientSchema } from "../../schemas/client.shema";

const resend = new Resend(process.env.API_KEY_RESEND);

export const POST: APIRoute = async ({ request }) => {
  const dataForm = await request.formData();
  const dataFormJson = Object.fromEntries(dataForm.entries());
  const result = clientSchema.safeParse(dataFormJson);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  }

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["luisdavidtts@outlook.com"],
    subject: "Contacto mediante portfolio",
    html: `<strong>Nombre contacto: ${dataFormJson.name},<br> Email: ${dataFormJson.email}, <br> Mensaje: ${dataFormJson.message} </strong>`,
  });

  if (error) {
    JSON.stringify({
      message:
        "Ha ocurrido un error mientras se enviava el formulario, por favor intente nuevamnete",
    }),
      { status: 200 };
  }

  return new Response(
    JSON.stringify({
      message: "Correo enviado",
    }),
    { status: 200 }
  );
};
