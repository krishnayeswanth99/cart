import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusUrl = '/api/status';

  constructor(private httpClient: HttpClient) { }

  getStatus(): Promise<void | any>{
    return this.httpClient.get(this.statusUrl)
              .toPromise()
              .then(this.json)
              .catch(this.error);
  }
  private error(error: any){
    let msg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(msg);
  }
  private json(msg: any){
    console.log(msg);
    return msg;
  }
}
