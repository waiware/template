export interface IDifyClient {
  replyYesOrNo(args: {
    post: string;
    questionTitle: string;
    questionBody: string;
    questionAnswer: string;
  }): Promise<string>;
  judgeAnswer(args: {
    answer: string;
    questionTitle: string;
    questionBody: string;
    questionAnswer: string;
  }): Promise<string>;
}
