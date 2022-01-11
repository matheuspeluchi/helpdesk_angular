import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TecnicoService } from "./../../../services/tecnico.service";
import { ClienteService } from "./../../../services/cliente.service";
import { ChamadoService } from "./../../../services/chamado.service";
import { FormControl, Validators } from "@angular/forms";
import { Tecnico } from "./../../../models/tecnico";
import { Component, OnInit } from "@angular/core";
import { Chamado } from "src/app/models/chamado";
import { Cliente } from "src/app/models/cliente";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  chamado: Chamado = {
    prioridade: "",
    status: "",
    titulo: "",
    observacoes: "",
    tecnico: "",
    cliente: "",
    nomeCliente: "",
    nomeTecnico: "",
  };

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(private chamadoService: ChamadoService, private clienteService: ClienteService, private tecnicoService: TecnicoService, private alert: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.cadastrar(this.chamado).subscribe(
      (resposta) => {
        this.alert.success("Chamado criado com sucesso", "Novo chamado");
        this.router.navigate(["chamados"]);
      },
      (ex) => {
        console.log(ex);

        this.alert.error(ex.error.error);
      }
    );
  }

  findAllClientes(): void {
    this.clienteService.listar().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.listar().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.titulo.valid && this.observacoes.valid && this.tecnico.valid && this.cliente.valid;
  }
}
