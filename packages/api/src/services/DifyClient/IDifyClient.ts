export interface IDifyClient {
  replyYesOrNo(args: {
    post: string;
    questionTitle: string;
    questionBody: string;
    questionAnswer: string;
    userId: string;
  }): Promise<string>;
}
