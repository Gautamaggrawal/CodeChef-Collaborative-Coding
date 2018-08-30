import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent }   from './home/home.component';
import { AuthComponent }      from './auth/auth.component';
//import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  //{ path: 'heroes', component: HeroesComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}