import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { guardsGuard } from '../auth/guards/guards.guard';

const routes: Routes = [
  {
    path:'', component: DashboardLayoutComponent,
    canActivate: [guardsGuard],
    children:[

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
