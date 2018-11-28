import { AuthEffects } from './auth.effects';
import { SelfEffects } from './self.effects';

export const effects: any[] = [AuthEffects, SelfEffects];

export * from './auth.effects';
export * from './messages.effects';
export * from './self.effects';
