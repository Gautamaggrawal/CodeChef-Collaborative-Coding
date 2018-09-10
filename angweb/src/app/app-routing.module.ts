import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';
 
import { HomeComponent }   from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProblemComponent } from './home/problem/problem.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'problem/:problemCode', component: ProblemComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}