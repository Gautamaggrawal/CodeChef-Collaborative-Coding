import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProblemService } from '../../shared/service/problem/problem.service';
import { ProblemList } from './problemListModel';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.css']
})
export class ProblemsListComponent implements OnInit {

  categoryName: string;                     // categoryName - school,easy,medium,hard,challenge
  problemsList: ProblemList [];             // list of all the problems

  constructor(private router: Router,
    private problemService: ProblemService) { }

  ngOnInit() {
    // get categoryName from url e.g 'school from /home/school'
    this.categoryName = this.router.url.substring(6);
    this.getProbemList();
  }
  
  onClickProblem(problemCode) {
    console.log(problemCode);
    this.router.navigate(['home',problemCode]);
  }

  getProbemList() {
    this.problemService.getProblemList(this.categoryName).subscribe(data =>{
      this.problemsList = data.result.data.content;
    });
  }
}
