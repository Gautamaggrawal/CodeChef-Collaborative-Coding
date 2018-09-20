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
        path: 'problem',
        redirectTo:'problem/school',
        pathMatch: 'full'
      },
      {
        path: 'problem/school',
        component: ProblemsListComponent,canActivate:[AuthGuard]
      },
      {
        path: 'problem/easy',
        component: ProblemsListComponent,canActivate:[AuthGuard]
      },
      {
        path: 'problem/medium',
        component: ProblemsListComponent,canActivate:[AuthGuard]
      },
      {
        path: 'problem/hard',
        component: ProblemsListComponent,canActivate:[AuthGuard]
      },
      {
        path: 'problem/challenge',
        component: ProblemsListComponent,canActivate:[AuthGuard]
      },
      {
        path: 'problem/:problemCode',
        component:ProblemComponent,canActivate:[AuthGuard]
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
