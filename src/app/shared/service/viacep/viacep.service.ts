import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class cepService {

  constructor(private http: HttpClient) { }


    buscarCep(cep: string) {
    return this.http.get<any>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
  }
}
