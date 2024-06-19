import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';
import { Observable } from 'rxjs';
import { BillResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  generateReport(data: any) {
    return this.http.post(this.apiUrl + CONSTANTS.API_URL.BILL.generate_report, data, { headers: CONSTANTS.HEADERS.content_json, responseType: 'blob' })
  }

  getPDF(data: any) {
    return this.http.post(this.apiUrl + CONSTANTS.API_URL.BILL.get_pdf + data.uuid, data, { responseType: 'blob' })
  }

  getBills() {
    return this.http.get<BillResponse[]>(this.apiUrl + CONSTANTS.API_URL.BILL.get_bills)
  }

  delete(id: any) {
    return this.http.delete<{message: string}>(this.apiUrl + CONSTANTS.API_URL.BILL.delete_bill + id, {
      headers: CONSTANTS.HEADERS.content_json
    })
  }
}
