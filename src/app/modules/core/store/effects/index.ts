import { MessagesEffects } from './messages.effects';
import { RouterEffects } from './router.effects';
import { SelfEffects } from './self.effects';

export const effects: any[] = [RouterEffects, MessagesEffects, SelfEffects];
