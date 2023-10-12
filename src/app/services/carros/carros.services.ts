import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carros } from '../../models/carros/carros';  

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  API: string = 'http://localhost:8080/api/carro'; 
  http = inject(HttpClient);
  Service: any;

  constructor() { }

  listAll(): Observable<Carros[]> {
    return this.http.get<Carros[]>(this.API);
  }

  save(carros: Carros): Observable<Carros> {
    return this.http.post<Carros>(this.API, carros);
  }

  exemploErro(): Observable<Carros[]> {
    return this.http.get<Carros[]>(this.API + '/erro');
  }

  edit(carros: Carros): Observable<Carros> {
    return this.http.put<Carros>(`${this.API}/${carros.id}`, carros);
  }
    
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}