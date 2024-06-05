import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product, { headers: CONSTANTS.HEADERS.content_json });
  }

  addProduct(data: any) {
    return this.http.post(this.apiUrl + CONSTANTS.API_URL.PRODUCT.add_product, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  updateProduct(data: any) {
    return this.http.patch(this.apiUrl + CONSTANTS.API_URL.PRODUCT.update_product + data.id, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  deleteProduct(id: any) {
    return this.http.delete(this.apiUrl + CONSTANTS.API_URL.PRODUCT.delete_product + id, { headers: CONSTANTS.HEADERS.content_json });
  }

  updateStatus(data: any) {
    this.http.patch(this.apiUrl + CONSTANTS.API_URL.PRODUCT.update_status + data.id, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  getProductByCategory(category: string) {
    return this.http.get(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product, {
      params: { 'category': category }
    });
  }

  getProductById(id: string) {
    return this.http.get(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product_by_id + id);
  }
}
