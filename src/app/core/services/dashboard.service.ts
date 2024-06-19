import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CONSTANTS } from '../../utils/constants';
import { DashboardResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  getDetails() {
    return this.http.get<DashboardResponse>(this.url + CONSTANTS.API_URL.DASHBOARD.dashboard_details);
  }
}
