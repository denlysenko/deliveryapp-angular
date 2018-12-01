export interface Feedback {
  success(message: string): void;
  error(message: string): void;
  info(message: string): void;
}
