import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './services/auth.service';

export const importDeclarations: any[] = [CommonModule, ReactiveFormsModule];

export const componentDeclarations: any[] = [AuthFormComponent];

export const providerDeclarations: any[] = [AuthService, AuthenticatedGuard];
