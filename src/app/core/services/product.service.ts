import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../../utils/constants';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiURL;
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product, { headers: CONSTANTS.HEADERS.content_json });
  }

  addProduct(data: any) {
    return this.http.post<{ message: string; product: Product }>(this.apiUrl + CONSTANTS.API_URL.PRODUCT.add_product, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  updateProduct(data: any) {
    return this.http.patch<{ message: string }>(this.apiUrl + CONSTANTS.API_URL.PRODUCT.update_product + data.id, data, { headers: CONSTANTS.HEADERS.content_json });
  }

  deleteProduct(id: any) {
    return this.http.delete<{ message: string }>(this.apiUrl + CONSTANTS.API_URL.PRODUCT.delete_product + id, { headers: CONSTANTS.HEADERS.content_json });
  }

  updateStatus(id: number) {
    return this.http.patch<{ message: string }>(this.apiUrl + CONSTANTS.API_URL.PRODUCT.update_status + id, { headers: CONSTANTS.HEADERS.content_json });
  }


  // order page
  getProductByCategory(category: string) {
    return this.http.get<Product[]>(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product, {
      params: { 'category': category }
    });
  }

  getProductById(id: string) {
    return this.http.get(this.apiUrl + CONSTANTS.API_URL.PRODUCT.get_product_by_id + id);
  }
}
