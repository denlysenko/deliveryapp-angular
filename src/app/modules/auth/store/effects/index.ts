import { LoginEffects } from './login.effects';
import { RegisterEffects } from './register.effects';
import { SelfEffects } from './self.effects';

export const effects: any[] = [LoginEffects, RegisterEffects, SelfEffects];

export * from './login.effects';
export * from './messages.effects';
export * from './register.effects';
export * from './self.effects';
