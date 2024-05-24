import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CONSTANTS } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  getDetails(){
    return this.http.get(this.url + CONSTANTS.url.dashboard_details);
  }
}
