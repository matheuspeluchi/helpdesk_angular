import { ChamadoService } from "./../../../services/chamado.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Chamado } from "./../../../models/chamado";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
  lista: Chamado[] = [];
  listaFiltrada: Chamado[] = [];
  valorFiltrado: Chamado[] = [];
  displayedColumns: string[] = ["id", "titulo", "cliente", "tecnico", "dataAbertura", "prioridade", "status", "acoes"];
  dataSource = new MatTableDataSource<Chamado>(this.lista);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ChamadoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe((res) => {
      this.lista = res;
      this.dataSource = new MatTableDataSource<Chamado>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltrado.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if ((status = "1")) {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }

  orderByStatus(status?: any): void {
    let list: Chamado[] = [];
    this.lista.forEach((item) => {
      console.log(status);
      if (item.status === status || status == "3") {
        list.push(item);
      }
    });
    this.listaFiltrada = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }
}
