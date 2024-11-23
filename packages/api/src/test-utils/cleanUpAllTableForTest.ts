// NOTE: jest-prismaはトランザクションを利用したcleanupなのでパフォーマンスIssueが上がるまではライブラリを使用しない素朴なcleanupを行う

import { Prisma } from '@prisma/client';
import { prismaClient } from '../libs/PrismaClientSingleton';

// 参考: https://zenn.dev/ubie_dev/articles/8b1954f29781cb
export const cleanUpAllTableForTest = async () => {
  const tableNames = Prisma.dmmf.datamodel.models.map(model => model.dbName);

  for (const table of tableNames) {
    await prismaClient.$queryRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
  }
};
