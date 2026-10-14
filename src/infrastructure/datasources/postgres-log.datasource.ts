import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/plugins/envs.plugin";
import { SeverityLevel } from "../../generated/prisma/enums";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: envs.POSTGRES_URL,
});

const prisma = new PrismaClient({ adapter });

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      },
    });

    console.log("Register creates un PG", newLog);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const logs = await prisma.logModel.findMany({
      where: {
        level,
      },
    });

    console.log(logs);

    return logs.map(LogEntity.fromObject);
  }
}
