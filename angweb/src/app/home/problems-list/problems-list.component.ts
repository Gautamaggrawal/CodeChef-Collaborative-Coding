import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.css']
})
export class ProblemsListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  onClickProblem(problemCode) {
    console.log(problemCode);
    this.router.navigate(['home/list',problemCode]);
  }
}
