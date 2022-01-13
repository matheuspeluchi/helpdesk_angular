import { Observable } from "rxjs";
import { IAppState } from "./../../../store/IAppState";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./../../../services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"],
})
export class TemplateComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private alert: ToastrService, private store: Store<{ app: IAppState }>) {}

  drawer$: Observable<boolean> = this.store.select("app").pipe(map((e) => e.drawer));

  ngOnInit(): void {
    this.router.navigate(["/home"]);
  }

  logout() {
    this.router.navigate(["login"]);
    this.authService.logout();
    this.alert.info("Logout realizado com sucesso!", "Logout", { timeOut: 7000 });
  }
}
