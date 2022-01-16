import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.baseUrl}/clientes`);
  }

  cadastrar(tecnico: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.baseUrl}/clientes`, tecnico);
  }

  obterPorId(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.baseUrl}/clientes/${id}`);
  }

  update(tecnico: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.baseUrl}/clientes/${tecnico.id}`, tecnico);
  }

  delete(id: any) {
    return this.http.delete<Cliente>(`${environment.baseUrl}/clientes/${id}`);
  }
}
