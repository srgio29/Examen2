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
  private fb: FormBuilder,
  private fbi: FormBuilder
){ }  

formInvoice: FormGroup = this.fb.group({
  id: [],
  correlative: [],
  name: [],
  schedules:[],
  address:[],
  phone:[],
  email:[]
})

formItem: FormGroup = this.fbi.group({
  description: [],
  id:[],
  value:[]
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

ocultaritem():void {
  this.visible = false
  this.formItem.reset()
}

mostrar(data?: Invoice):void{
  if (data?.id) {
    this.formInvoice.setValue({ ...data, 'disponible': String(data.id) })
  }
  this.visible = true
}

mostraritem(data?: Item):void{
 
    this.formItem.setValue
  
  this.visible = true
}



agregar():void{
  this.itemService.create({ body: this.formItem.value }).subscribe((datoAgregado) => {
    this.item = [...this.item, datoAgregado]
    this.messageService.success('Item creado Exitosamente!')
    this.formItem.reset()
  })
  this.visible=false
}



guardar():void{
  //this.formInvoice.setValue({ ...this.formInvoice.value, 'disponible': Boolean(this.formInvoice.value.disponible) })
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

  guardaritem():void{
    //this.formInvoice.setValue({ ...this.formInvoice.value, 'disponible': Boolean(this.formInvoice.value.disponible) })
    if (this.formItem.value.id) {
      this.itemService.updateById({ 'id': this.formItem.value.id, 'body': this.formItem.value}).subscribe(
        () => {
          this.item = this.item.map(obj => {
            if (obj.id === this.formItem.value.id){
              return this.formItem.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado exitosamente!')
          this.formItem.reset()
        }
      )
    } else {
      delete this.formItem.value.id
      this.itemService.create({ body: this.formItem.value }).subscribe((datoAgregado) => {
        this.item = [...this.item, datoAgregado]
        this.messageService.success('Registro creado Exitosamente!')
        this.formItem.reset()
      })
    }
    this.visible=false
    }


}





