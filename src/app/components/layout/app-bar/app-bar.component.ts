import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { toggleMenu } from "src/app/store";
import { IAppState } from "src/app/store/AppState";

@Component({
  selector: "app-bar",
  templateUrl: "./app-bar.component.html",
  styleUrls: ["./app-bar.component.css"],
})
export class AppBarComponent implements OnInit {
  constructor(private store: Store<{ app: IAppState }>) {}

  ngOnInit(): void {}

  toggle() {
    this.store.dispatch(toggleMenu());
  }
}
