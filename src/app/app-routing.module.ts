import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesMainComponent } from './Sales/sales-main/sales-main.component';
import { SalesComponent } from './sales/sales.component';


const routes: Routes = [
  {path:'',redirectTo:'SalesMain',pathMatch:'full'},
  {path:'Sales',component:SalesComponent},
  {path:'SalesMain',children:[
    {path:'',component:SalesMainComponent},
    {path:'edit/:id',component:SalesMainComponent}

  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
