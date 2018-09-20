import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../../shared/service/problem/problem.service';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.css']
})
export class ProblemsListComponent implements OnInit {

  // categoryName - school,easy,medium,hard,challenge
  categoryName: string;

  constructor(private router: Router,
    private problemService: ProblemService) { }

  ngOnInit() {
    // returns school from url e.g '/home/problem/school'
    this.categoryName = this.router.url.substring(14);
    console.log("route -"+this.categoryName);
  }
  
  onClickProblem(problemCode) {
    console.log(problemCode);
    this.router.navigate(['home/problem',problemCode]);
  }
}
