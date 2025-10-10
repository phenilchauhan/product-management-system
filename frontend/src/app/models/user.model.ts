export interface User {
  id?: number;
  email: string;
  password?: string; // plaintext only for create; backend must store encrypted
}
