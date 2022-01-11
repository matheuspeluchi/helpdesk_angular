import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
  
    lista: Tecnico[] = []
    displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
    dataSource = new MatTableDataSource<Tecnico>(this.lista);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(res => {
      this.lista = res
      this.dataSource = new MatTableDataSource<Tecnico>(res);
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
