import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from '../../shared/service/problem/problem.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private problemService: ProblemService) { }

  ngOnInit() {
    this.getProblem();
  }

  getProblem(): void {
    const problemCode = this.route.snapshot.paramMap.get('problemCode');
    console.log(problemCode);
    this.problemService.getProblem(problemCode)
    .subscribe(data => {
      //this.problem = JSON.data;
      console.log(JSON.stringify(data));
    });
  }
}
