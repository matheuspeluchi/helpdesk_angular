import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1)
    }else{
      this.tecnico.perfis.push(perfil);
    }
  }

  validarCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

  cadastrar(): void {
    this.service.cadastrar(this.tecnico).subscribe(() => {
      this.alert.success("Técnico cadastrado com suceso!")
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
