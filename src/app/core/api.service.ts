import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from './in-memory-data.service';

export type Id = number | string;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private refreshProducts$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  searchProducts(query: string): Observable<Product[]> {
    const params = new HttpParams().set('name', query);

    return this.http.get<Product[]>('/api/products', { params }).pipe(
      // in-memory-web-api doesn't support "name like" out of the box,
      // so filter on client to show RxJS usage
      map((list) =>
        list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
      ),
      shareReplay(1),
      catchError(() => of([])),
    );
  }

  listProducts(): Observable<Product[]> {
    return this.refreshProducts$.pipe(
      switchMap(() => this.http.get<Product[]>('/api/products')),
      shareReplay(1),
    );
  }

  upsertProduct(p: Product): Observable<Product> {
    return (
      p.id
        ? this.http.put<Product>(`/api/products/${p.id}`, p)
        : this.http.post<Product>('/api/products', p)
    ).pipe(
      tap(() => this.refreshProducts$.next()), // Trigger refresh after update
    );
  }

  submitContact(payload: any) {
    return this.http.post('/api/contacts', payload);
  }
}
