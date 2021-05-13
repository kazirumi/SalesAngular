import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesMainService } from '../shared/sales-main.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: []
})
export class SalesComponent implements OnInit {

  constructor(private service:SalesMainService,private router:Router) { }

  ngOnInit() {

    this.service.getSalesMainTable();
  }

  openForEdit(id:number){
    console.log(id);
    this.router.navigate(['/SalesMain/edit/'+id]);
  }

  DeleteSalesMainItem(id:number){
console.log(id);
    this.service.deleteSalesMain(id);
  }

}
