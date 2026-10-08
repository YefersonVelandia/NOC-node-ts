import { checkService } from "../domain/use-cases/cheks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource
);

export class Server {
  static start() {
    console.log("Server started...");

    CronService.createJob(

      '*/5 * * * * *',
      () => {

        const url  = 'https://localhost:3000'
        new checkService(
          fileSystemLogRepository,
          () => console.log(` ${ url } is ok`),
          ( error ) => console.log( error ),
        ).execute( url );
      }
    );
  }
}
