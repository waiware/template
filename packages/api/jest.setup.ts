import * as dotenv from 'dotenv';
dotenv.config();

// テスト時に上書きする環境変数
process.env.DATABASE_URL = 'postgresql://app_user:local-password@localhost:5432/test?schema=public';
