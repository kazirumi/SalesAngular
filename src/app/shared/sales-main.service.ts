import { Injectable } from '@angular/core';
import { SalesMain } from './sales-main.model';
import { SalesSub } from './sales-sub.model';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesMainService {
formData:SalesMain;
salesItems:SalesSub[];

SalesMainsList:SalesMain[]


  constructor(private http:HttpClient) { }

  getItemList(){
   return this.http.get(environment.apiURL+'/Items').toPromise();
  }

  SaveOrUpdateSalesMain(){
    
      // var body={
      //   ...this.formData,
      //   SalesItems:this.salesItems
      // }
     
      this.formData.SalesItems=this.salesItems;
     return this.http.post(environment.apiURL+'/SalesMains',this.formData);
  }

  getSalesMainTable(){
    return this.http.get(environment.apiURL+'/SalesMains').toPromise().then(res=>this.SalesMainsList=res as SalesMain[]);
  }

  getSalesMainByID(id:number):any{
    return this.http.get(environment.apiURL+'/SalesMains/'+id).toPromise();
  }

  deleteSalesMain(id:number){
    this.http.delete(environment.apiURL+'/SalesMains/'+id).subscribe(res=>{
      this.getSalesMainTable();
    });
  }
}
