export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      NODE_ENV: 'development' | 'production';
      DB_URI: string;
      MAILTRAP_HOST: string;
      MAILTRAP_PORT: number;
      MAILTRAP_USER: string;
      MAILTRAP_PASS: string;
    }
  }
}
