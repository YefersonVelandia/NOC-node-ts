import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements: Attachements[];
}

interface Attachements {
  filaname: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements,
      });
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Email sent",
        origin: "email.service.ts",
      });

      console.log(sentInformation);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: "Email not sent",
        origin: "email.service.ts",
      });
      return false;
    }
  }

  sendEmailWithFilesSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
            <h2>Reporte de Logs del Sistema</h2>
            <p>Notificación automática del sistema</p>
    `;

    const attachements: Attachements[] = [
      { filaname: "logs-low.log", path: "./logs/logs-low.log" },
      { filaname: "logs-medium.log", path: "./logs/logs-medium.log" },
      { filaname: "logs-high.log", path: "./logs/logs-high.log" },
    ];

    this.sendEmail({
      to,
      subject,
      htmlBody,
      attachements,
    });
  }
}
