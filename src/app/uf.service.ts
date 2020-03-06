import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uf } from './uf';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  readonly url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) { }

  getUf(): Observable<Uf[]> {
    return this.http.get<Uf[]>(this.url);
  }
}
