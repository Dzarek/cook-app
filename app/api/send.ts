// import { mailOptions, transporter } from "../../config/nodemailer";

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const data = req.body;
//     const dataUpperCase = data.name.toUpperCase();
//     if (!data) {
//       return res.status(400).json({ message: "Bad request" });
//     }
//     try {
//       await transporter.sendMail({
//         ...mailOptions,
//         subject: `NOWY TRANSFER OD ${dataUpperCase}`,
//         text: "",
//         html: `<p><strong>${dataUpperCase}</strong> dodał nowy transfer w terminie <strong>${data.convertDate}</strong> ! Potwierdź zlecenie w aplikacji: https://airportgr8way.vercel.app/</p>`,
//       });
//       return res.status(200).json({ success: true });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ message: error.message });
//     }
//   }

//   return res.status(400).json({ message: "Bad request" });
// };

// export default handler;
