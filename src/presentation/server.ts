import { checkService } from "../domain/use-cases/cheks/check-service";
import { checkServiceMultiple } from "../domain/use-cases/cheks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fslogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource(),
);
const postgreslogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource(),
);

const emailService = new EmailService();

export class Server {
  static start() {
    console.log("Server started...");

    //todo: Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "yefersonvelandia4@gmail.com",
    //   "yrvelandiaa@udistrital.edu.co",
    // ]);
    // emailService.sendEmailWithFilesSystemLogs([
    //   "yefersonvelandia4@gmail.com",
    //   "yrvelandiaa@udistrital.edu.co",
    // ]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";
    //   new checkServiceMultiple(
    //     [fslogRepository,
    //       mongoLogRepository,
    //       postgreslogRepository
    //     ],
    //     () => console.log(` ${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });
  }
}
