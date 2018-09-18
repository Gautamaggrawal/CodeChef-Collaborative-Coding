import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guard';
import { HomeComponent }   from './home.component';
import { ProblemComponent } from './problem/problem.component';
import { ProblemsListComponent } from './problems-list/problems-list.component';

const routes:Routes = [
  {
    path: '',component: HomeComponent,
    children:[
      {
        path: 'list/:problemCode',
        component:ProblemComponent,canActivate:[AuthGuard]
      },
      {
        path: 'list',
        component: ProblemsListComponent,canActivate:[AuthGuard]
      }
    ]
  },{
    path:'**',
    redirectTo:''
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
