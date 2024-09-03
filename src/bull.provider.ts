import { IProvider, Report } from "@expressots/core";
import Queue, { QueueOptions } from "bull";
import { injectable } from "inversify";
import * as Redis from 'ioredis';

@injectable()
export class BullProvider implements IProvider {
  readonly name: string = "Bull Provider";
  readonly version: string = "1.0.0";
  readonly author: string = "Richard Zampieri";
  readonly repo: string = "https://github.com/expressots/bull-queue";
  private report: Report;
  private globalConnection: Redis.RedisOptions | string | undefined;

  constructor() {
    this.report = new Report();
  }

  public setGlobalConnection(options: Redis.RedisOptions | string | undefined): void {
    this.globalConnection = options;
  }

  public createQueue(queueName: string) {
    let connectionOptions;

    if (typeof this.globalConnection === 'object') {
      connectionOptions = {
        redis: this.globalConnection
      };
    } else {
      connectionOptions = this.globalConnection;
    }

    return new Queue(queueName, connectionOptions);
  }
}