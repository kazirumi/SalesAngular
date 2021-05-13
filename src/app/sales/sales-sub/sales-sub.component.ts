import { Component, OnInit,Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/shared/item.model';
import { SalesMainService } from 'src/app/shared/sales-main.service';
import { SalesSub } from 'src/app/shared/sales-sub.model';
@Component({
  selector: 'app-sales-sub',
  templateUrl: './sales-sub.component.html',
  styles: []
})
export class SalesSubComponent implements OnInit {
formData:SalesSub;
itemList:Item[];

isValid:boolean=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<SalesSubComponent>,
    private service:SalesMainService) { }

  ngOnInit() {

    this.service.getItemList().then(res=>this.itemList=res as Item[])

    if(this.data.salesItemIndex==null)
    this.formData={
      SalesSubID:0,
      SalesMainID:this.data.salesMainID,
      ItemID:0,
      ItemQuantity:0,
      TotalPrice:0,

      ItemName:"",
      Price:0
    }

    else{
      this.formData=Object.assign({},this.service.salesItems[this.data.salesItemIndex]); 
    }
  }

  updatePrice(ctrl){
    if(ctrl.selectedIndex==0)
    {this.formData.Price=0;
    this.formData.ItemName="";
    }
    else{
      this.formData.Price=this.itemList[ctrl.selectedIndex-1].ItemRate;
      this.formData.ItemName=this.itemList[ctrl.selectedIndex-1].ItemName;
      
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.TotalPrice=parseFloat((this.formData.ItemQuantity*this.formData.Price).toFixed(2));
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value))
    {
      if(this.data.salesItemIndex==null)
       {
         
          form.value.SalesMainID=0;
          // form.value.SalesSubID=0;
        console.log(form.value);
        this.service.salesItems.push(form.value);
        
        
       }
       else{
         this.service.salesItems[this.data.salesItemIndex]=form.value;
       }
       this.dialogRef.close();
    }
  }

  validateForm(formData:SalesSub){
    this.isValid=true;
    if(formData.ItemID==0){
      this.isValid=false;
    }
    else if(this.formData.ItemQuantity==0){
      this.isValid=false;
    }

    return this.isValid;
  }

}
