import { SalesSub } from "./sales-sub.model";

export class SalesMain {
   
    SalesMainID:number;
    SalesDate:Date;    
    TotalAmount:number;
    SalesItems:SalesSub[];

    DeletedOrderItemIDs:number[]=[];
}
