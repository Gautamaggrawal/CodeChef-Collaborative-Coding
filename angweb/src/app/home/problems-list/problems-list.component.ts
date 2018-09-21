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
  problemsList;

  constructor(private router: Router,
    private problemService: ProblemService) { }

  ngOnInit() {
    // returns school from url e.g '/home/school'
    this.categoryName = this.router.url.substring(6);
    console.log("route -"+this.categoryName);
    this.getProbemList();
  }
  
  onClickProblem(problemCode) {
    console.log(problemCode);
    this.router.navigate(['home',problemCode]);
  }

  getProbemList() {
    this.problemService.getProblemList(this.categoryName).subscribe(data =>{
      this.problemsList = data.result.data.content;
      console.log(this.problemsList);
    });
  }
}
