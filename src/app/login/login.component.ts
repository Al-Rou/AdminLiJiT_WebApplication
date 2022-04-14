import {Component} from "@angular/core";
import {ReqresService} from "../services/reqres.service";
import {FirstComponent} from "../first/first.component";
import {async} from "rxjs";


@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})

export class LoginComponent{
  userName = '';
  passWord = '';
  waitingMessage = '';
  hide = true;


  constructor(private reqresService: ReqresService, private firstComp: FirstComponent) {
  }

  onShowPassword(){
    this.hide = !this.hide;
  }

  onGetToken(){
    if(this.userName==='Admin' && this.passWord==='2022') {
      this.waitingMessage = 'It takes some while. Please be patient...';
      //this.getTokenPlease();
      //this.checkToken();
      this.reqresService.tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjQ5OTUzOTQ3LCJleHAiOjE2NDk5NzE5NDcsImlhdCI6MTY0OTk1Mzk0N30.R6KiPpnvHsYab1_JUk6LLhNblTYJ_HVd7z36n8GJ4jY';

      //this.reqresService.tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjQ5ODc2NzE4LCJleHAiOjE2NDk4OTQ3MTgsImlhdCI6MTY0OTg3NjcxOH0.NlZxrlB89WRNvhHH4dgdDd7cEAedat1p6l4CDAcKQ5I'; // local

      this.firstComp.adminAuthorized = true;
      this.firstComp.loginPageClicked = false;
    }else{
      alert('Username or Password is wrong!');
    }
  }
  async getTokenPlease(){
    (await this.reqresService.getJWT()).subscribe((res) => {
      this.reqresService.tokenValue = res.token;
    });
  }
  async checkToken(){
    for(let k = 0; k < 10; k++){
      await this.delay(1000);
      if(this.reqresService.tokenValue !== ''){
        //console.log(this.reqresService.tokenValue);
        this.waitingMessage = '';
        this.firstComp.adminAuthorized = true;
        this.firstComp.loginPageClicked = false;
        return;
      }
    }
    alert('Something went wrong. Try again later!');
    this.waitingMessage = 'Something went wrong. Try again later!';
  }
  async delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
export interface TokenLiJiT {
  token: string;
  refreshToken: string;
}
