import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../Auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  constructor( public httpClient : HttpClient ) { }

  postPublication(publication : any, authResponse : string){

    console.log(authResponse);
    const headers = new HttpHeaders().set("Content-Type", "application/json")
                                     .set('Access-Control-Allow-Origin', '*')
                                     .set('Authorization', authResponse)
                                     .append('content-type','application/x-www-form-urlencoded');
    
    const url = 'http://127.0.0.1:8000/api/publications';
    
    return  this.httpClient.post(url, publication, {headers});
  }
}
