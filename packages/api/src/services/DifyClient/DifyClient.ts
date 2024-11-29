import { logger } from '../../libs/logger';
import type { IDifyClient } from './IDifyClient';

export class DifyClient implements IDifyClient {
  async replyYesOrNo({
    post,
    questionTitle,
    questionBody,
    questionAnswer,
  }: {
    post: string;
    questionTitle: string;
    questionBody: string;
    questionAnswer: string;
  }): Promise<string> {
    return await this.executeWithRetry(
      async () =>
        await this.postRequest({
          key: 'app-jS7IRHLokqOOqbW4VzjTSkav',
          inputs: {
            post,
            questionTitle,
            questionBody,
            questionAnswer,
          },
        }),
    );
  }

  private async executeWithRetry(callback: () => Promise<string>) {
    return await callback()
      .catch(async () => await callback())
      .catch(async () => {
        await new Promise(r => setTimeout(r, 15000));
        return await callback();
      })
      .catch((e: Error) => {
        logger('Difyのリクエストに失敗しました', { callback });
        throw e;
      });
  }

  private async postRequest<T>({
    key,
    inputs,
  }: {
    key: string;
    inputs: T;
  }): Promise<string> {
    console.log(inputs, 49);

    const res = await fetch('https://api.dify.ai/v1/completion-messages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs,
        response_mode: 'blocking',
        user: `request-about-${key}`,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch Dify API');
    }

    const result = (await res.json()) as { answer: string };
    return result.answer;
  }
}
