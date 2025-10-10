import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private base = `${environment.apiUrl}/categories`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Category[]> { return this.http.get<Category[]>(this.base); }
  create(cat: Partial<Category>) { return this.http.post(this.base, cat); }
  update(id: number, cat: Partial<Category>) { return this.http.put(`${this.base}/${id}`, cat); }
  delete(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
