import { User } from "./../../../models/user";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { toggleMenu } from "src/app/store/actions";
import { AppState } from "src/app/store/AppState";
import { map } from "rxjs/operators";

@Component({
  selector: "app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.css"],
})
export class AppBarComponent implements OnInit {
  // constructor(private store: Store<{ app: AppState }>) {}

  // user$: Observable<User> = this.store.select("app").pipe(map((e) => e.user));
  // nameInitials$: Observable<string> = this.store.select("app").pipe(map((e) => this.getNameInitials(e.user)));

  constructor(private store: Store<{ app: AppState }>) {}

  user$: Observable<User> = this.store.select((state) => state.app.user);
  nameInitials$: Observable<string> = this.store.select((state) => this.getNameInitials(state.app.user));

  ngOnInit(): void {}

  getNameInitials(user: User) {
    let nomeSeparado = user.name.split(" ");
    return nomeSeparado[0][0] + nomeSeparado[1][0];
  }

  toggle() {
    this.store.dispatch(toggleMenu());
  }
}
