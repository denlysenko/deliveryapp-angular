import { containers } from './containers';
import { ProfileResolver } from './resolvers/profile.resolver';
import { ProfileService } from './services/profile.service';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [ProfileResolver, ProfileService];
