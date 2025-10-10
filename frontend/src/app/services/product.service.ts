import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private base = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(page = 1, pageSize = 10, search = ''): Observable<{ data: Product[], total: number }> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (search) params = params.set('search', search);
    return this.http.get<{ data: Product[], total: number }>(this.base, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  createProduct(fd: FormData): Observable<Product> {
    return this.http.post<Product>(this.base, fd);
  }

  updateProduct(id: number, fd: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, fd);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  bulkUploadBatch(products: any[]): Observable<any> {
  return this.http.post(`${this.base}/bulk`, { products });
}

downloadReport(format: 'csv' | 'xlsx') {
  return this.http.get(`${this.base}/report?format=${format}`, { responseType: 'blob' });
}
}
