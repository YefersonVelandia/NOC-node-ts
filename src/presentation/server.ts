import { checkService } from "../domain/use-cases/cheks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  // new FileSystemDatasource(),
  new MongoLogDataSource()
);

const emailService = new EmailService();

export class Server {
  static start() {
    console.log("Server started...");

    // send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "yefersonvelandia4@gmail.com",
    //   "yrvelandiaa@udistrital.edu.co",
    // ]);
    // emailService.sendEmailWithFilesSystemLogs([
    //   "yefersonvelandia4@gmail.com",
    //   "yrvelandiaa@udistrital.edu.co",
    // ]);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new checkService(
        fileSystemLogRepository,
        () => console.log(` ${url} is ok`),
        (error) => console.log(error),
      ).execute(url);
    });
  }
}
