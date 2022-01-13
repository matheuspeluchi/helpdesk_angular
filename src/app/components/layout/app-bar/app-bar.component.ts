import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { toggle } from "src/app/store/app.state";
import { IAppState } from "src/app/store/IAppState";

@Component({
  selector: "app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.css"],
})
export class AppBarComponent implements OnInit {
  constructor(private store: Store<{ app: IAppState }>) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.store.dispatch(toggle());
  }
}
