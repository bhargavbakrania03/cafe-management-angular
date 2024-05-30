import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getProducts(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product, {
      headers
    });
  }

  addProduct(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + CONSTANTS.API_URL.PRODUCT.add_product, data, {
      headers
    });
  }

  updateProduct(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(this.apiUrl + CONSTANTS.API_URL.PRODUCT.update_product + data.id, data, {
      headers
    });
  }

  deleteProduct(id: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.apiUrl + CONSTANTS.API_URL.PRODUCT.update_product + id, {
      headers
    });
  }
}
