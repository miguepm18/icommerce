import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Producto } from 'src/app/modelo/Producto';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  @Input() public producto:Producto;
  public imagen:string;
  validations_form: FormGroup;
  file:File;
  constructor( private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) { }

  ngOnInit() {
    if(this.producto!=null){
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(this.producto.activo, Validators.compose([
          Validators.required
        ])),
        nombre: new FormControl(this.producto.nombre, Validators.compose([
          Validators.required
        ])),
        precio: new FormControl(this.producto.precio, Validators.compose([
          Validators.required
        ]))
      });
    }else{
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(false, Validators.compose([
          Validators.required
        ])),
        nombre: new FormControl('', Validators.compose([
          Validators.required
        ])),
        precio: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }
  }
  async cerrarModal() {
    await this.modalController.dismiss();
  }

  onSubmit(values) {

    
    let producto: Producto = Producto.createFromJsonObject(values);
    
    if(this.producto!=null){
      producto.id=this.producto.id;
    }

    this.apiService.uploadImage(this.file,this.validations_form.controls['nombre'].value)

    .then( (downloadUrl)=>{
      
      producto.imagen=downloadUrl;
      
      if (this.producto == null) {
        this.apiService.registrarProducto(producto)
          .then((respuesta: any) => {
            this.mostrarAlert("Producto creado correctamente.");
          });
      } else {
        this.apiService.modificarProducto(producto)
          .then((respuesta: any) => {
            this.mostrarAlert("Producto modificado correctamente.");
          });
      }
      
    })

    .catch((error)=>{

      console.log(error);

    });
    
    
    

  }

  async mostrarAlert(texto: string) {
    this.alertController.create({
      header: 'Información',
      message: texto,
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.cerrarModal();
          }
        }
      ]
    }).then(alertEt => {
      alertEt.present();
    })
  }
  uploadImage(event: FileList){
    this.file = event.item(0);

    

  }

}