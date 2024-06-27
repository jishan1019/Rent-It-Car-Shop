import nodemailer from "nodemailer";
import config from "../config";
import fs from "fs";
import juice from "juice";
import path from "path";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const sendEmail = async (
  toEmail: string,
  username: string,
  carName: string,
  bookingDate: string,
  startTime: string,
  endTime: string,
  totalPrice: number
) => {
  const htmlTemplatePath = path.join(__dirname, "../views/carReturn.html");

  let htmlTemplate;
  try {
    htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }

  const replacements = {
    username: username,
    carName: carName,
    bookingDate: bookingDate,
    startTime: startTime,
    endTime: endTime,
    totalPrice: totalPrice,
  };

  let inlineHtml = htmlTemplate;
  for (const placeholder in replacements) {
    inlineHtml = inlineHtml.replace(
      new RegExp(`{{${placeholder}}}`, "g"),
      replacements[placeholder as keyof typeof replacements] as string
    );
  }

  const inlineHtmlWithStyles = juice(inlineHtml);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: config.node_env === "production" ? 465 : 587,
    secure: config.node_env === "production", // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "rahatali65654@gmail.com",
      pass: "zvbswnbluioqtuoe",
    },
  });

  await transporter.sendMail({
    from: '"Rentit" <rahatali65654@gmail.com>', // sender address
    to: toEmail,
    subject: "Car Return Confirmation", // Subject line
    text: "Your car was returned successfully. Thank you for choosing us.", // plain text body
    html: inlineHtmlWithStyles, // html body
  });
};
