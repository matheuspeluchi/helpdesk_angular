import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  
    lista: Cliente[] = []
    displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
    dataSource = new MatTableDataSource<Cliente>(this.lista);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(res => {
      this.lista = res
      this.dataSource = new MatTableDataSource<Cliente>(res);
      this.dataSource.paginator = this.paginator;
    })
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
