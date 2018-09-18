import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";

import { ProblemService } from '../../shared/service/problem/problem.service';
import { UserService } from '../../shared/service/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  startVideoClicked: boolean = false;
  queryParamPresent: boolean = false;
  videoShareUrl: string; 
  problem;
  lobbyCode: string;
  videoApiUrl;

  constructor(
    private domSanitizer : DomSanitizer,
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private userService: UserService) { }

  ngOnInit() {
    this.getProblem();
    this.setupVideoChat();
  }

  getProblem(): void {
    const problemCode = this.route.snapshot.paramMap.get('problemCode');
    console.log("problemCode" + problemCode);
    this.problemService.getProblem(problemCode)
    .subscribe(data => {
      this.problem = data;
      //console.log(this.problem.result.data.content.body);
      //console.log(JSON.stringify(data));
    });
  }

  setupVideoChat() {
    this.route.queryParams.subscribe(params =>{
      this.lobbyCode = params['video'];
      console.log('lobbyUrl '+this.lobbyCode);
      if(this.lobbyCode != undefined){
        this.videoApiUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(environment.videoApiUrl + this.lobbyCode);
        this.queryParamPresent = true; 
        this.videoShareUrl = window.location.href.split("?")[0] + '?video=' + this.lobbyCode;
      }else{
        this.userService.getUsername().subscribe(lobbyCode => {
          this.lobbyCode = lobbyCode;
          this.videoApiUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(environment.videoApiUrl + lobbyCode);
          this.videoShareUrl = window.location.href.split("?")[0] + '?video=' + lobbyCode;
        });
      }
    });
  }

  onStartVideo() {
    this.startVideoClicked = true;
    console.log(this.startVideoClicked);
  }

  onVideoClosed() {
    if(this.queryParamPresent){
      window.location.href = window.location.href.split("?")[0];
    }else{
      this.startVideoClicked = false;
    }
  }

  showToast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
  }

}
