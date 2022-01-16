import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Chamado } from "../models/chamado";

@Injectable({
  providedIn: "root",
})
export class ChamadoService {
  constructor(private http: HttpClient) {}

  obterPorId(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${environment.baseUrl}/chamados/${id}`);
  }

  listar(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${environment.baseUrl}/chamados`);
  }

  cadastrar(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${environment.baseUrl}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${environment.baseUrl}/chamados/${chamado.id}`, chamado);
  }
}
