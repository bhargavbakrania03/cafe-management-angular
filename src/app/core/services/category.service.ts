import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';
import { CategoryResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiURL;
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();

  constructor(private http: HttpClient) { }

  add(data: any) {
    console.log('called')
    return this.http.post<{message: string, newCategory: CategoryResponse}>(this.url + CONSTANTS.API_URL.CATEGORY.add_category, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  update(data: any) {
    return this.http.patch<{ message: string }>(this.url + CONSTANTS.API_URL.CATEGORY.update_category + data.id, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  getCategory() {
    return this.http.get<CategoryResponse[]>(this.url + CONSTANTS.API_URL.CATEGORY.get_category);
  }
}
