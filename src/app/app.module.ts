import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './sales/sales.component';
import { SalesMainComponent } from './Sales/sales-main/sales-main.component';
import { SalesSubComponent } from './Sales/sales-sub/sales-sub.component';
import { SalesMainService } from './shared/sales-main.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from "@angular/common/http";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    SalesMainComponent,
    SalesSubComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  entryComponents:[SalesSubComponent],
  providers: [SalesMainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
