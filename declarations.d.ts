declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: number;
        MONGO_URL: string;
        API_URL: string;
      }
    }
  }