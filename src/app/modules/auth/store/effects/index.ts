import { LoginEffects } from './login.effects';
import { MessagesEffects } from './messages.effects';
import { RegisterEffects } from './register.effects';
import { SelfEffects } from './self.effects';

export const effects: any[] = [
  LoginEffects,
  RegisterEffects,
  SelfEffects,
  MessagesEffects
];

export * from './login.effects';
export * from './messages.effects';
export * from './register.effects';
export * from './self.effects';
