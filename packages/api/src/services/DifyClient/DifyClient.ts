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

  async judgeAnswer({
    answer,
    questionTitle,
    questionBody,
    questionAnswer,
  }: {
    answer: string;
    questionTitle: string;
    questionBody: string;
    questionAnswer: string;
  }): Promise<string> {
    return await this.executeWithRetry(
      async () =>
        await this.postRequest({
          key: 'app-nxS0AIZSdgRtvRFyfijEadi9',
          inputs: {
            answer,
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
        logger('Difyのリクエストに失敗しました', { errorMessage: e.message, callback });
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

    logger('Difyのレスポンス', { key, inputs, res });
    if (!res.ok) {
      throw new Error('Failed to fetch Dify API');
    }

    const result = (await res.json()) as { answer: string };
    return result.answer;
  }
}
