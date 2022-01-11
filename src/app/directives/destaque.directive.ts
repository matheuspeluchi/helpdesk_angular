import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
  selector: "[appDestaque]",
})
export class DestaqueDirective implements OnInit {
  @HostBinding("style.backgroundColor") corFundo: string;

  constructor() {}

  ngOnInit(): void {}

  @HostListener("mouseover") onOver() {
    this.corFundo = "lightGray";
  }

  @HostListener("mouseout") onLeave() {
    this.corFundo = "transparent";
  }
}
