import { Routes } from '@angular/router';
import { AdminPage } from './features/admin-dashboard/admin-page/admin-page';
import { ClientPage } from './features/client/client-page/client-page';

export const routes: Routes = [
    {path: "admin", component: AdminPage},
    {path: "", redirectTo: "client", pathMatch: "full"},
    {path: "client", component: ClientPage},
    {path: '**', redirectTo:'client'}
];
