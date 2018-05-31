import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsService {

  private PRODUCTS_API_URL = `${environment.API_URL}/products`;

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.PRODUCTS_API_URL}`);
  }

  getProduct(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCTS_API_URL}/${name}`);
  }

  postProducts(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.PRODUCTS_API_URL}`, product);
  }

  putProducts(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.PRODUCTS_API_URL}`, product);
  }

  deleteProducts(name: string): Observable<any> {
    return this.http.delete<any>(`${this.PRODUCTS_API_URL}/${name}`);
  }

}
