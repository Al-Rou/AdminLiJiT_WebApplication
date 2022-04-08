import {Component} from "@angular/core";
import {ReqresService} from "../services/reqres.service";


@Component({
  selector: 'first-page',
  templateUrl: './first.component.html'
})

export class FirstComponent{
  eventsPageClicked = false;
  aboutPageClicked = false;
  typePageClicked = false;
  detailPageClicked = false;
  adminAuthorized = false;
  loginPageClicked = false;

  constructor(private reqresService: ReqresService) {
  }

  onSignOutPage(){
    this.eventsPageClicked = false;
    this.aboutPageClicked = false;
    this.typePageClicked = false;
    this.detailPageClicked = false;
    this.adminAuthorized = false;
    this.loginPageClicked = false;
  }

  onShowLoginPage(){
    this.loginPageClicked = true;
    this.eventsPageClicked = false;
    this.aboutPageClicked = false;
    this.typePageClicked = false;
    this.detailPageClicked = false;
  }

  onShowEventsPage(){
    this.eventsPageClicked = true;
    this.aboutPageClicked = false;
    this.typePageClicked = false;
    this.detailPageClicked = false;
    this.loginPageClicked = false;
  }
  onShowAboutPage(){
    this.eventsPageClicked = false;
    this.aboutPageClicked = true;
    this.typePageClicked = false;
    this.detailPageClicked = false;
    this.loginPageClicked = false;
  }
  onShowTypePage(){
    this.eventsPageClicked = false;
    this.aboutPageClicked = false;
    this.typePageClicked = true;
    this.detailPageClicked = false;
    this.loginPageClicked = false;
  }
  onShowDetailPage(){
    this.eventsPageClicked = false;
    this.aboutPageClicked = false;
    this.typePageClicked = false;
    this.detailPageClicked = true;
    this.loginPageClicked = false;
  }
}
