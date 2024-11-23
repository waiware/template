export interface ICloudTaskScheduler {
  enqueueTask<T>(args: {
    endpoint: string;
    scheduleDate: Date;
    body: T;
  }): Promise<void>;
}
