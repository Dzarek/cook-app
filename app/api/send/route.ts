import { mailOptions, transporter } from "../../../config/nodemailer";
// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const body = await req.json();
    const data = body.email;
    console.log(data);

    if (!data) {
      return NextResponse.json({ message: "Bad request" });
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: `STĘPKI GOTUJĄ`,
        text: "",
        html: `<p>Witaj! <br/><br/>  Nowa osoba chce dołączyć do społeczności STĘPKI GOTUJĄ. <br/> <br/> Adres email: <strong>${data}</strong> <br/> <br/> Dodaj nowego użytkownika w aplikacji: https://stepki-gotuja.vercel.app/</p>`,
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      //   console.log(error);
      return NextResponse.json({ message: error });
    }
  }

  return NextResponse.json({ message: "Bad request" });
};
