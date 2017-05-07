import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

 const BASE_URL = 'https://dev.medrecord.nl';
 const AUTH_TOKEN = 'helloletmeinplease';
 const EHR_ID = 452;

@Injectable()
export class MdVisionService {
  constructor(private http: Http) {}

  private makeRequest(path: string) {

    let url = `${BASE_URL}/${path}?authToken=${AUTH_TOKEN}`;
    return this.http.get(url)
      .map((response) => response.json())
      .toPromise()
      .catch((error:any) => {
          console.log(error);
          return Promise.reject(error);
      });
  }

  getBloodPressureData()
  {
      let url = `ehr/${EHR_ID}/procedure/bloodpressure`;
      return this.makeRequest(url);
  }
  
  getAcqScores()
  {
      let url = `ehr/${EHR_ID}/procedure/acq/omh`;
      return this.makeRequest(url);
  }
    getBMIData()
  {
      let url = `ehr/${EHR_ID}/procedure/bmi`;
      return this.makeRequest(url);
  }
}