export interface ICloudTaskScheduler {
  enqueueTask<T>(args: {
    domain: string;
    endpoint: string;
    scheduleDate: Date;
    body: T;
  }): Promise<void>;
}
