import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
    //<any>(`${apiUrls.authServiceApi}login`)</any>
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email:string){
    return this.http.post<any>(`${apiUrls.authServiceApi}sendEmail`, {email:email});
  }

  resetPasswordService(resetObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}resetPassword`, resetObj);
  }

  // isLoggedIn(){
  //   return !!localStorage.getItem("user_id");
  // }

  isLoggedIn(): boolean {
    if(this.document.defaultView && this.document.defaultView.localStorage){
      return !!this.document.defaultView.localStorage.getItem("user_id");
    }
    return false;
  }

  
}
