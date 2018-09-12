import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ProblemComponent } from './problem/problem.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProblemsListComponent } from './problems-list/problems-list.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ClipboardModule
    ],
    declarations: [
        HomeComponent,
        ProblemComponent,
        ProblemsListComponent
    ]
})

export class HomeModule {
}