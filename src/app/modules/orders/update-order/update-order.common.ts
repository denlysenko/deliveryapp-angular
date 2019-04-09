import { containers } from './containers';
import { OrderResolver } from './resolvers/order.resolver';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [OrderResolver];
