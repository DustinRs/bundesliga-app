import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatButtonModule,MatCardModule, HttpClientModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  httpCLient = inject(HttpClient);
  tableData: any;
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.fetchTableData();

    
  }

  fetchTableData() {
    let yearNumber = new Date().getFullYear() -1;
    let year = yearNumber.toString();
    
    this.httpCLient
      .get(`https://api.openligadb.de/getbltable/bl1/${year}`)
      .subscribe((data: any) => {
        this.tableData = data;
        console.log('tabelle', data);
        
      });
  }
}
