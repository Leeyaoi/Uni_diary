declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      FRONT_ORIGIN: string;
    }
  }
}

export {};
