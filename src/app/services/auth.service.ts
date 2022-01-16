import { environment } from "./../../environments/environment";
import { Credenciais } from "src/app/models/credenciais";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(user: Credenciais) {
    return this.http.post(`${environment.baseUrl}/login`, user, {
      observe: "response",
      responseType: "text",
    });
  }

  successfullLogin(token: string) {
    localStorage.setItem("Authorization", token);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem("Authorization");
    if (token !== null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
