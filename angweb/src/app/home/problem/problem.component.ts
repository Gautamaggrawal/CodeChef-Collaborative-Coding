import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { trigger, style, animate, transition } from '@angular/animations';

import { ProblemService } from '../../shared/service/problem/problem.service';
import { UserService } from '../../shared/service/user.service';
import { environment } from '../../../environments/environment';
import { Problem } from './problemModel';

@Component({
  selector: 'app-problem',
  //animation for dialog of share url
  animations: [
    trigger(
      'enterAnimation', [
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('200ms', style({transform: 'translateY(-10%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  showShareDialog: boolean = true;        //flag to show dialog box
  startVideoClicked: boolean = true;      //flag to show video tab
  queryParamPresent: boolean = false;     //flag to check if query param present
  videoShareUrl: string;                  //video share url 
  problem: Problem;                       //problem fetched for probemCode
  lobbyCode: string;                      //lobby code for video chat
  videoApiUrl;                            //video api url

  constructor(
    private domSanitizer : DomSanitizer,
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private userService: UserService) { }

  ngOnInit() {
    this.getProblem();
    this.setupVideoChat();
  }

  // Fetch problem for problemCode
  getProblem(): void {
    const problemCode = this.route.snapshot.paramMap.get('problemCode');
    this.problemService.getProblem(problemCode)
    .subscribe(res => {
      this.problem = res.result.data.content;
    });
  }

  // Setup Video Chat for a particular problemCode and user (hosted or joined)
  setupVideoChat() {
    this.route.queryParams.subscribe(params =>{
      this.lobbyCode = params['video'];

      if(this.lobbyCode != undefined){
        // gets called when user is invited by friend
        this.queryParamPresent = true;
        this.setupVideoApiUrl(this.lobbyCode); 
      }else{
        // gets called when user is hosting
        this.userService.getUsername().subscribe(lobbyCode => {
          this.lobbyCode = lobbyCode;
          this.setupVideoApiUrl(lobbyCode);
        });
      }
    });
  }

  // sanitize the video url and attach lobbyCode to the URL.
  setupVideoApiUrl(lobbyCode){
    this.videoApiUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(environment.videoApiUrl + lobbyCode);
    this.videoShareUrl = window.location.href.split("?")[0] + '?video=' + lobbyCode;
  }

  // flag set true when start video clicked;
  onStartVideo() {
    this.startVideoClicked = true;
  }

  // redirect to codechef submit page of the particular problem.
  onSubmitClick(){
    window.location.href = environment.codeChefSubmitUrl + this.problem.problemCode;
  }

  onVideoClosed() {
    if(this.queryParamPresent){
      window.location.href = window.location.href.split("?")[0];
    }else{
      this.startVideoClicked = false;
      this.showShareDialog = false;
    }
  }

  showToast() {
    this.showShareDialog = false;
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
  }

  closeDialogbox(){
    this.showShareDialog = false;
  }

}
