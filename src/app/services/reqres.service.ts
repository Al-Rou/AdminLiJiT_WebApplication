import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Weather, UpComingEvent} from "../events/events.component";
import {catchError, retry} from "rxjs/operators";
import {JwtService} from "./jwt.service";
import {About} from "../about/about.component";
import {TokenLiJiT} from "../login/login.component"
import {Type} from "../listingType/type.component";
import {Detail} from "../listingDetail/detail.component";

@Injectable({
  providedIn: 'root'
})

export class ReqresService{
  private urlGetJWT = 'https://adminlijit.azurewebsites.net/AuthenManagement/Login';

  private urlWeather = 'https://adminlijit.azurewebsites.net/weatherforecast';
  private urlUpcomingEvents = 'https://adminlijit.azurewebsites.net/Events/Upcoming';
  private urlAllEvents = 'https://adminlijit.azurewebsites.net/Events/All';
  private urlGetAbout = 'https://adminlijit.azurewebsites.net/AboutContent/About';
  private urlUpdateAbout = 'https://adminlijit.azurewebsites.net/AboutContent/Update?id=';
  private urlGetAllTypes = 'https://adminlijit.azurewebsites.net/ListingType/Category';
  private urlGetAllBusinesses = 'https://adminlijit.azurewebsites.net/ListingDetail/Stores';
  private urlToCreateNewEvent = 'https://adminlijit.azurewebsites.net/Events/Create';
  private urlToUpdateEvent = 'https://adminlijit.azurewebsites.net/Events/Update?id=';
  private urlToDeleteEvent = 'https://adminlijit.azurewebsites.net/Events/Delete?id=';
  //The token is
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjQ5MzkwMzY3LCJleHAiOjE2NDk0MDgzNjcsImlhdCI6MTY0OTM5MDM2N30.Q5HxG_4b-lLM-_v3KS7PDG-mNb0lJTJF6q_0g6FKd2o
  tokenValue = '';
  constructor(private http: HttpClient) {

  }
  async getJWT(): Promise<Observable<TokenLiJiT>> {
    const headerDict = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      "UserName":"LiJiT",
      "Password":"1234"
    }
    alert('Go for JWT');
    return this.http.post<TokenLiJiT>(this.urlGetJWT, requestBody, requestOptions);
  }
  async getWeather(): Promise<Observable<Weather[]>> {
    const headerDict = {
      'Content-Type': 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    alert('ReqresService is called');
    return this.http.get<Weather[]>(this.urlWeather, requestOptions);
  }

  async getAllEvents(): Promise<Observable<UpComingEvent[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    alert('ReqresService is called');
    return this.http.get<UpComingEvent[]>(this.urlAllEvents, requestOptions);
  }

  async getUpcomingEvents(): Promise<Observable<UpComingEvent[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    alert('ReqresService is called');
    return this.http.get<UpComingEvent[]>(this.urlUpcomingEvents, requestOptions);
  }
  async getTypes(): Promise<Observable<Type[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<Type[]>(this.urlGetAllTypes, requestOptions);
  }

  async getBusiness(): Promise<Observable<Detail[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<Detail[]>(this.urlGetAllBusinesses, requestOptions);
  }

  async getAbout(): Promise<Observable<About>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    alert("req is called");
    return this.http.get<About>(this.urlGetAbout, requestOptions);
  }

  async setUpcomingEvent(newEvent: UpComingEvent){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      id: 0,
      name: newEvent.name,
      note: newEvent.note,
      address: newEvent.address,
      address2: newEvent.address2,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      imageEvent: newEvent.imageEvent,
      location: newEvent.location,
      phone: newEvent.phone,
      email: newEvent.email,
      shareLink: newEvent.shareLink,
      organizer: newEvent.organizer
    }
    alert("this is post in ReqresService!");
    this.http.post<UpComingEvent>(this.urlToCreateNewEvent, requestBody, requestOptions).subscribe(res =>{
      alert('The event was successfully stored!');
    });
  }
  async putUpdateEvent(updatedEve: UpComingEvent, idForUpdate: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      name: updatedEve.name,
      note: updatedEve.note,
      address: updatedEve.address,
      address2: updatedEve.address2,
      description: updatedEve.description,
      startDate: updatedEve.startDate,
      endDate: updatedEve.endDate,
      imageEvent: updatedEve.imageEvent,
      location: updatedEve.location,
      phone: updatedEve.phone,
      email: updatedEve.email,
      shareLink: updatedEve.shareLink,
      organizer: updatedEve.organizer
    }
    alert("this is post in ReqresService!");
    this.http.put<UpComingEvent>(this.urlToUpdateEvent+idForUpdate, requestBody, requestOptions).subscribe(res =>{
      alert('The event was successfully updated!');
    });
  }
  async removeEvent(idToRemove: string){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    // const requestBody = {
    //   id: 0,
    //   name: newEvent.name,
    //   note: newEvent.note,
    //   address: newEvent.address,
    //   address2: newEvent.address2,
    //   description: newEvent.description,
    //   startDate: newEvent.startDate,
    //   endDate: newEvent.endDate,
    //   imageEvent: newEvent.imageEvent,
    //   location: newEvent.location,
    //   phone: newEvent.phone,
    //   email: newEvent.email,
    //   shareLink: newEvent.shareLink,
    //   organizer: newEvent.organizer
    // }
    alert("this is delete in ReqresService!");
    this.http.delete<UpComingEvent>(this.urlToDeleteEvent+idToRemove, requestOptions).subscribe(res =>{
      alert('The event was successfully deleted!');
    });
  }
  async uploadPhotoForAbout(newAbout: About){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      title1: newAbout.title1,
      title2: newAbout.title2,
      content1: newAbout.content1,
      content2: newAbout.content2,
      imageAbout: newAbout.imageAbout,
      facebook: newAbout.facebook,
      twitter: newAbout.twitter,
      instagram: newAbout.instagram,
      telephon: newAbout.telephon,
      email: newAbout.email,
      shareLink: newAbout.shareLink
    }
    if(newAbout.imageAbout !== ''){
      alert('Photo not empty');
    }else {
      alert('Receive by reqres' + newAbout.id);
    }
    this.http.put<About>(this.urlUpdateAbout+newAbout.id, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on About are successfully stored!');
    });
  }

  async setUpdateAboutContent(newAbout: About){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      title1: newAbout.title1,
      title2: newAbout.title2,
      content1: newAbout.content1,
      content2: newAbout.content2,
      imageAbout: newAbout.imageAbout,
      facebook: newAbout.facebook,
      twitter: newAbout.twitter,
      instagram: newAbout.instagram,
      telephon: newAbout.telephon,
      email: newAbout.email,
      shareLink: newAbout.shareLink
    }
    alert('Receive by reqres'+newAbout.id);
    this.http.put<About>(this.urlUpdateAbout+newAbout.id, requestBody, requestOptions).subscribe(res =>{
      alert('Changes on About are successfully stored!');
    });
  }


}
