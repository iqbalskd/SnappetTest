import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

 const apiUrl = 'app/data/data.json';

@Injectable()
export class snappetService {
  constructor(private http: Http) {}

  private makeRequest(path: string) {

   
    return this.http.get(path)
      .map((response) => response.json())
      .toPromise()
      .catch((error:any) => {
          console.log(error);
          return Promise.reject(error);
      });
  }

  getCorrectAnswersData()
  {
      return this.makeRequest(apiUrl).then(function(data){
          if(data)
          {
              // group data by student
            return  _.groupBy(data, function(data:any){
            return  data.Subject;
            });
          }

      });
  }
  
  getProgressData()
  {
     
      return this.makeRequest(apiUrl).then(function(data){
          if(data)
          {
              // group data by student
            return  _.groupBy(data, function(data:any){
            return  data.UserId;
            });
          }

      });
  }
    getBMIData()
  {
      return this.makeRequest(apiUrl);
  }
}