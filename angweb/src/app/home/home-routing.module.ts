import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './home.component';
import { ProblemComponent } from './problem/problem.component';
import { ProblemsListComponent } from './problems-list/problems-list.component';

const routes:Routes = [{
  path: '',component: HomeComponent, 
  children:[
    {
      path: ':problemCode',
      component:ProblemComponent
    },
    {
      path: '',
      component: ProblemsListComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
