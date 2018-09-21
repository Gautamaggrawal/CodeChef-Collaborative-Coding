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
        path: 'school',
        component: ProblemsListComponent,canActivate: [AuthGuard]
      },
      {
        path: 'easy',
        component: ProblemsListComponent,canActivate: [AuthGuard]
      },
      {
        path: 'medium',
        component: ProblemsListComponent,canActivate: [AuthGuard]
      },
      {
        path: 'hard',
        component: ProblemsListComponent,canActivate: [AuthGuard]
      },
      {
        path: 'challenge',
        component: ProblemsListComponent,canActivate: [AuthGuard]
      },
      {
        path: ':problemCode',
        component:ProblemComponent,canActivate: [AuthGuard]
      }
    ]
  },
  { path: '**', redirectTo:'', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
