import { containers } from './containers';
import { ProfileResolver } from './resolvers/profile.resolver';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [ProfileResolver];
