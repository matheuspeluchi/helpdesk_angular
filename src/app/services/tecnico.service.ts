import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tecnico } from "../models/tecnico";

@Injectable({
  providedIn: "root",
})
export class TecnicoService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${environment.baseUrl}/tecnicos`);
  }

  cadastrar(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${environment.baseUrl}/tecnicos`, tecnico);
  }

  obterPorId(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${environment.baseUrl}/tecnicos/${id}`);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${environment.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any) {
    return this.http.delete<Tecnico>(`${environment.baseUrl}/tecnicos/${id}`);
  }
}
