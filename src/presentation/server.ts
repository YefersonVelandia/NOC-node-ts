import { checkService } from "../domain/use-cases/cheks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {
  static start() {
    console.log("Server started...");


    CronService.createJob(

      '*/5 * * * * *',
      () => {

        const url  = 'https://google.com'
        new checkService(
          () => console.log(` ${ url } is ok`),
          ( error ) => console.log( error ),
        ).execute( url );
      }
    );
  }
}
