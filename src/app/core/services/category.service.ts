import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.post(this.url + CONSTANTS.API_URL.CATEGORY.add_category, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  update(data: any) {
    return this.http.patch(this.url + CONSTANTS.API_URL.CATEGORY.update_category + data.id, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  getCategory() {
    return this.http.get(this.url + CONSTANTS.API_URL.CATEGORY.get_category);
  }
}
