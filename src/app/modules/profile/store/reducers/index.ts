import { createFeatureSelector } from '@ngrx/store';
import { ProfileState } from './profile.reducer';

export { profileReducer, ProfileState } from './profile.reducer';
export const getProfileState = createFeatureSelector<ProfileState>('profile');
