import { Routes } from '@angular/router';
import { AdminPage } from './features/admin-dashboard/admin-page/admin-page';
import { ClientPage } from './features/client/client-page/client-page';
import { MathcPage } from './features/match-feat/mathc-page/mathc-page';
import { MatchData } from './core/models/match.model';

export const routes: Routes = [
    {path: "admin", component: AdminPage},
    {path: 'match', component: MathcPage},
    {path: "", redirectTo: "client", pathMatch: "full"},
    {path: "client", component: ClientPage},
    {path: '**', redirectTo:'client'}
];