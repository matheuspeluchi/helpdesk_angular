import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Credenciais } from "src/app/models/credenciais";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from "@ngrx/store";
import { setUser } from "src/app/store/actions";
import { User } from "src/app/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: Credenciais = {
    email: "",
    senha: "",
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));
  private jwt: JwtHelperService = new JwtHelperService();
  constructor(private alert: ToastrService, private servicce: AuthService, private router: Router, private store: Store) {}

  ngOnInit(): void {}

  logar() {
    this.servicce.authenticate(this.user).subscribe(
      (res) => {
        let token = res.headers.get("Authorization").substring(7);
        let decodedToken: User = this.jwt.decodeToken(token);
        this.store.dispatch(
          setUser({
            name: decodedToken.name,
            email: decodedToken.email,
          })
        );
        this.servicce.successfullLogin(token);
        this.router.navigate([""]);
      },
      () => {
        this.alert.error("Usuario e/ou senha inválidos!");
        this.user.senha = "";
      }
    );
  }

  validarCampos(): boolean {
    return this.email.valid && this.senha.valid && this.user.email !== "" && this.user.senha !== "";
  }
}
