import type { Answer } from '@prisma/client';

export interface ICorrectResultCreator {
  execute(args: {
    answer: Answer;
  }): Promise<void>;
}
