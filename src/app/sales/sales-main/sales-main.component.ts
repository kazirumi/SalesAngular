import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesMainService } from 'src/app/shared/sales-main.service';
import { SalesSubComponent } from '../sales-sub/sales-sub.component';

@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styles: []
})
export class SalesMainComponent implements OnInit {
  isValid:boolean=true;

  constructor(private service:SalesMainService,private dialog:MatDialog,private router:Router,private currentRoute:ActivatedRoute) { }

  ngOnInit() {
    let id= this.currentRoute.snapshot.paramMap.get('id');
    if(id==null)
    this.resetForm();
    else{
      
      this.service.getSalesMainByID(parseInt(id)).then(res=>{
        this.service.formData=res.saleMain;
        
        this.service.salesItems=res.SalesSubList;
      },
      err=>{
        console.log(err);
      }
      );
    }
  }


  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData={

      SalesMainID:null,
      SalesDate:new Date(),   
      TotalAmount:0,
      SalesItems:[],
      DeletedOrderItemIDs:[]

    }
    this.service.salesItems=[];
  }
  
  AddOrEditSalesItem(salesItemIndex,salesMainID){
    console.log(salesItemIndex);
    console.log(salesMainID);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    dialogConfig.data={salesItemIndex,salesMainID}

    this.dialog.open(SalesSubComponent,dialogConfig).afterClosed().subscribe(res=>{
      this.updateTotalAmount();
    });

  }

  DeleteSalesItem(SalesSubID:number,index:number){
    if(SalesSubID!=0)
    this.service.formData.DeletedOrderItemIDs.push(SalesSubID);
    this.service.salesItems.splice(index,1);
    this.updateTotalAmount();
  }

  updateTotalAmount(){
   this.service.formData.TotalAmount = this.service.salesItems.reduce((prev,curr)=>{
      return prev+curr.TotalPrice
    },0);

    this.service.formData.TotalAmount = parseFloat((this.service.formData.TotalAmount).toFixed(2));

  }

validateForm(){
  this.isValid=true;
  if(this.service.formData.SalesDate==null)
  this.isValid=false;
  else if(this.service.salesItems.length==0)
  this.isValid=false;

  return this.isValid;
}

onSubmit(form:NgForm){
  if(this.validateForm())
  {
    
      if(this.service.formData.SalesMainID==null)
      this.service.formData.SalesMainID=0;
      this.service.SaveOrUpdateSalesMain().subscribe(res=>{
        this.resetForm();
        this.router.navigate(['/Sales']);

      },
      err=>{
        console.log(err);
      }
      );
  }

}

  

}
