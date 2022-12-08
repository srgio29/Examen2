import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceControllerService, ItemControllerService } from 'src/app/api/services';
import { Invoice, Item } from 'src/app/api/models';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

invoice: Invoice[]=[];
item: Item[]=[];
visible: boolean = false;

constructor(
  private invoiceService: InvoiceControllerService,
  private itemService: ItemControllerService,
  private messageService: NzMessageService,
  private fb: FormBuilder
){ }  

formInvoice: FormGroup = this.fb.group({
  id: [],
  correlative: [],
  name: [],
  shcedules:[],
  email:[]
})


ngOnInit(): void {
  this.invoiceService.find().subscribe(data => this.invoice = data)
  this.itemService.find().subscribe(data=> this.item = data)
}

eliminar(id: string): void {
  this.invoiceService.deleteById({id}).subscribe(()=>{
    this.invoice = this.invoice.filter(x => x.id !== id);
    this.messageService.success('Registro Eliminado Exitosamente')

  })
}

cancel():void{
  this.messageService.info('Su registro sigue activo!')
}


ocultar():void {
  this.visible = false
  this.formInvoice.reset()

}


mostrar(data?: Invoice):void{
  this.visible = true
}



guardar():void{
  this.formInvoice.setValue({ ...this.formInvoice.value, 'disponible': Boolean(this.formInvoice.value.disponible) })
  if (this.formInvoice.value.id) {
    this.invoiceService.updateById({ 'id': this.formInvoice.value.id, 'body': this.formInvoice.value}).subscribe(
      () => {
        this.invoice = this.invoice.map(obj => {
          if (obj.id === this.formInvoice.value.id){
            return this.formInvoice.value;
          }
          return obj;
        })
        this.messageService.success('Registro actualizado exitosamente!')
        this.formInvoice.reset()
      }
    )
  } else {
    delete this.formInvoice.value.id
    this.invoiceService.create({ body: this.formInvoice.value }).subscribe((datoAgregado) => {
      this.invoice = [...this.invoice, datoAgregado]
      this.messageService.success('Registro creado Exitosamente!')
      this.formInvoice.reset()
    })
  }
  this.visible=false
  }
}





