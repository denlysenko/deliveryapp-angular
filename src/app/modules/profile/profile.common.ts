import { components } from './components';
import { containers } from './containers';
import { ProfileResolver } from './resolvers/profile.resolver';
import { ProfileService } from './services/profile.service';

export const componentDeclarations: any[] = [...containers, ...components];

export const providerDeclarations: any[] = [ProfileResolver, ProfileService];
