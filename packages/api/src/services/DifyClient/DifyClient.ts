import type { IDifyClient } from './IDifyClient';

export class DifyClient implements IDifyClient {
  async replyYesOrNo({
    post,
    questionTitle,
    questionBody,
    questionAnswer,
    userId,
  }: {
    post: string;
    questionTitle: string;
    questionBody: string;
    questionAnswer: string;
    userId: string;
  }): Promise<string> {
    const res = await fetch('https://api.dify.ai/v1/completion-messages', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer app-jS7IRHLokqOOqbW4VzjTSkav',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          post,
          questionTitle,
          questionBody,
          questionAnswer,
        },
        response_mode: 'blocking',
        user: `request-about-${userId}`,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Dify API');
    }

    const result = (await res.json()) as { answer: string };
    return result.answer;
  }
}
