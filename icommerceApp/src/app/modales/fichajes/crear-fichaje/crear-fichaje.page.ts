import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Empleado } from 'src/app/modelo/Empleado';
import { Fichaje } from 'src/app/modelo/Fichaje';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-crear-fichaje',
  templateUrl: './crear-fichaje.page.html',
  styleUrls: ['./crear-fichaje.page.scss'],
})
export class CrearFichajePage implements OnInit {

  @Input() public fichaje: Fichaje;
  @Input() public empleado: Empleado;
  @Input() public empleados:Array<Empleado>;
  validations_form: FormGroup;
  
  constructor(private modalController: ModalController, public formBuilder: FormBuilder, private apiService: ApiServiceProvider, private alertController: AlertController) {
    
  }

  ngOnInit() {      
    if(this.fichaje!=null){
      if(this.empleado!=null){
        if(this.fichaje.horaSalida!=null){
          this.validations_form = this.formBuilder.group({
            activo: new FormControl(this.fichaje.activo, Validators.compose([
              Validators.required
            ])),
            horaEntrada: new FormControl(this.parsearFechaBD(this.fichaje.horaEntrada), Validators.compose([
              Validators.required
            ])),
            horaSalida: new FormControl(this.parsearFechaBD(this.fichaje.horaSalida), Validators.compose([
              
            ])),
            empleadoAsignado: new FormControl(this.fichaje.empleado.id, Validators.compose([
              Validators.required
            ]))
          });
        }else{
          this.validations_form = this.formBuilder.group({
            activo: new FormControl(this.fichaje.activo, Validators.compose([
              Validators.required
            ])),
            horaEntrada: new FormControl(this.parsearFechaBD(this.fichaje.horaEntrada), Validators.compose([
              Validators.required
            ])),
            horaSalida: new FormControl('', Validators.compose([
              
            ])),
            empleadoAsignado: new FormControl(this.fichaje.empleado.id, Validators.compose([
              Validators.required
            ]))
          });
        }
        
      }else{
        this.validations_form = this.formBuilder.group({
          activo: new FormControl(this.fichaje.activo, Validators.compose([
            Validators.required
          ])),
          horaEntrada: new FormControl(this.parsearFechaBD(this.fichaje.horaEntrada), Validators.compose([
            Validators.required
          ])),
          horaSalida: new FormControl(this.parsearFechaBD(this.fichaje.horaSalida), Validators.compose([
            
          ])),
          empleadoAsignado: new FormControl('', Validators.compose([
            Validators.required
          ]))
        });
      }
      
    }else{
      this.validations_form = this.formBuilder.group({
        activo: new FormControl(false, Validators.compose([
          Validators.required
        ])),
        horaEntrada: new FormControl('', Validators.compose([
          Validators.required
        ])),
        horaSalida: new FormControl('', Validators.compose([
          
        ])),
        empleadoAsignado: new FormControl('', Validators.compose([
          Validators.required
        ]))
      });
    }
  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }


  onSubmit(values) {
    values['horaEntrada'] = this.parsearFechaDatetime(values['horaEntrada']);
    if(values['horaSalida']!=''){
      values['horaSalida'] = this.parsearFechaDatetime(values['horaSalida']);
    }
    
    let ind:number = this.empleados.findIndex(x=> x.id==values['empleadoAsignado']);
    let fichaje: Fichaje = Fichaje.createFromJsonObject(values);
    if(ind!=-1){
      fichaje.empleado = this.empleados[ind];
    }
    
    
    
        
    console.log(fichaje);
    
    if (this.fichaje == null) {

      this.apiService.registrarFichaje(fichaje)
        .then((respuesta: any) => {
          this.mostrarAlert("Fichaje creado correctamente.");
        });
    } else {
      fichaje.id = this.fichaje.id;
    
      
      this.apiService.modificarFichaje(fichaje)
        .then((respuesta: any) => {
          this.mostrarAlert("Fichaje modificado correctamente.");
        });
    }
    
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

  parsearFechaBD(fechaFichaje:string){
    let fecha:Array<string> = fechaFichaje.split(' ');
    let diaMesAno:Array<string> = fecha[0].split('-');
    let horasMinutosSegundos:Array<string> = fecha[1].split(':');
    let sumaHoraria:string = "";
    if(diaMesAno[1] === "01" || diaMesAno[1] === "02" || diaMesAno[1]==="11" || diaMesAno[1]==="12"){
      sumaHoraria="+01:00";
    }
    if(diaMesAno[1] === "03"){
      if(Number.parseInt(diaMesAno[0])<=26){
        sumaHoraria="+01:00";
      }else{
        sumaHoraria="+02:00";
      }
    }
    if(diaMesAno[1]==="04" || diaMesAno[1]==="05" || diaMesAno[1]==="06" || diaMesAno[1]==="07" || diaMesAno[1]==="08" || diaMesAno[1]==="09"){
      sumaHoraria="+02:00";
    }
    if(diaMesAno[1]==="10"){
      if(Number.parseInt(diaMesAno[0])<=29){
        sumaHoraria="+02:00";
      }else{
        sumaHoraria="+01:00";
      }
    }
    
    let fechaParseada:string = "20"+diaMesAno[2]+"-"+diaMesAno[1]+"-"+diaMesAno[0]+"T"+horasMinutosSegundos[0]+":"+horasMinutosSegundos[1]+":"+horasMinutosSegundos[2]+sumaHoraria;
    return fechaParseada;
    
  }

  parsearFechaDatetime(fechaDateTime:string){
    let fechaSpliteada:Array<string> = fechaDateTime.split("T");
    let anoMesDia:Array<string> = fechaSpliteada[0].split('-');
    let horasMinutosSegundos:Array<string> = fechaSpliteada[1].split(':', 3);
    let segundos:Array<string> = horasMinutosSegundos[2].split("+");
    let ano:string = anoMesDia[0].charAt(2);
    let ano2:string = anoMesDia[0].charAt(3);
    
    
    anoMesDia[0]=ano+ano2;
    horasMinutosSegundos[2] = segundos[0];
    let fechaParseada:string = anoMesDia[2]+"-"+anoMesDia[1]+"-"+anoMesDia[0]+" "+horasMinutosSegundos[0]+":"+horasMinutosSegundos[1]+":"+horasMinutosSegundos[2];
    return fechaParseada;
    
  }
}
