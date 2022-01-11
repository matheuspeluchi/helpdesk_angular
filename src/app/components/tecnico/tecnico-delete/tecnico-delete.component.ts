import { Observable } from 'rxjs';
import { Tecnico } from './../../../models/tecnico';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    perfis: [],
    dataCriacao: ""
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, [Validators.required])
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(
    private service: TecnicoService,
    private alert: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get("id");
    this.obterTecnico();
  }

  obterTecnico(): void {
    this.service.obterPorId(this.tecnico.id).subscribe(res => {
      res.perfis = [];
      this.tecnico = res;
    })
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.alert.success("Técnico excluido com suceso!", "Delete")
      this.router.navigate(["tecnicos"])
    }, ex => {
      console.log(ex)
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.alert.error(element.message);
        });
      } else {
        this.alert.error(ex.error.message)
      }
    })
  }

}
