import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ResetAuthGuard } from './core/guards/reset-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
        path: 'cafe', children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard', canActivate: [AuthGuard],
                loadComponent: () => import('./components/cafe/dashboard/dashboard.component').then(m => m.DashboardComponent),
                data: {
                    expectedRole: ['admin', 'user']
                }
            },
            {
                path: 'category', canActivate: [AuthGuard],
                loadComponent: () => import('./components/cafe/manage-category/manage-category.component').then(m => m.ManageCategoryComponent),
                data: {
                    expectedRole: ['admin']
                }
            },
            {
                path: 'product', canActivate: [AuthGuard],
                loadComponent: () => import('./components/cafe/manage-product/manage-product.component').then(m => m.ManageProductComponent),
                data: {
                    expectedRole: ['admin']
                }
            },
        ]
    },
    { path: 'reset-password/:token', canActivate: [ResetAuthGuard], component: ResetPasswordComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
