import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule
  ]
})
export class MantenimientoModule { }
