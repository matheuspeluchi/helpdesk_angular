import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
  constructor(private http: HttpClient) { }
  
  listar():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`)
  }
  
  cadastrar(tecnico: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, tecnico);
  }
  
  obterPorId(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }
  
  update(tecnico: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${tecnico.id}`, tecnico)    
  }
  
  delete(id: any) {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }
}
