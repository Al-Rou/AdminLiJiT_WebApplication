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
    if(this.userName==='*********' && this.passWord==='**********') {
      this.waitingMessage = 'It takes some while. Please be patient...';
      //this.getTokenPlease();
      //this.checkToken();
      this.reqresService.tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjUwMDc3NTUyLCJleHAiOjE2NTAwOTU1NTIsImlhdCI6MTY1MDA3NzU1Mn0.OQT5qsMkbhXqHjfxwak4gPZllOrwJCtIBcgJ6hg9eJ0';

      //this.reqresService.tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjUwMDU0MTU4LCJleHAiOjE2NTAwNzIxNTgsImlhdCI6MTY1MDA1NDE1OH0.qq1Cy9JIAXwPfi_JBlH7CT3oTsY-Dj9mte6WZ2_8hKE'; // local

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
