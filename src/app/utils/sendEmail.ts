import nodemailer from "nodemailer";
import config from "../config";
import fs from "fs";
import juice from "juice";
import path from "path";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const sendEmail = async (toEmail: string) => {
  const htmlTemplatePath = path.join(__dirname, "../views/carReturn.html");

  let htmlTemplate;
  try {
    htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");
  } catch (err: any) {
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }

  const inlineHtml = juice(htmlTemplate);

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
    from: '"Forget Password Email from PH UNIVERSITY" <rahatali65654@gmail.com>', // sender address
    to: toEmail,
    subject: "Forget your password", // Subject line
    text: "Reset your password within 10 minutes", // plain text body
    html: inlineHtml, // html body
  });
};
