import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userCed: string = "";
  userPass: string = "";
  tipoIconoPass: string = "eye-outline";
  tipotextPass: string = "password";
  role: any = ""



  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private dataService: DataService,
  ) { }


  showIconPass() {
    if (this.tipotextPass == "password") {
      this.tipotextPass = "text"
      this.tipoIconoPass = "eye-off-outline"
    } else {
      this.tipotextPass = "password"
      this.tipoIconoPass = "eye-outline"
    }

  }

  user: Subscription;
  validar() {
    if (this.userCed.length == 10) {
      if (this.userPass.length >= 10) {
        // buscamos en la base de datos el rol y validamos usuario y contraseña
        this.user = this.dataService.getRol(this.userCed, this.userPass).subscribe(dato => {
          this.role = dato;
          if (this.role['role'] != 'null') {
            switch (this.role['role']) {

              case 'administrador':
                this.navCtrl.navigateForward('/home/administrador')
                break;
              case 'supervisor':
                this.navCtrl.navigateForward('/home/supervisor')
                break;

              case 'encuestador':
                //this.navCtrl.navigateForward('/home/encuestador')
                var fullname = this.role['nombre'] +" "+ this.role['apellido']
                this.navCtrl.navigateForward(`/home/encuestador/${JSON.stringify({ fullname: fullname, cedula: this.userCed })}`)
                break;
            }
          } else {
            this.mensajesAlert("Usuario/Contraseña", "Incorrectos");

          }
        })

      } else {
        this.mensajesAlert("Campo contraseña", "Ingrese de manera correcta su contraseña");
      }
    } else {
      this.mensajesAlert("Campo cedula", "Ingrese los 10 dígitos de su cédula");
    }


  }

  async mensajesAlert(texto1: string, texto2: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class --background',
      header: `${texto1}`,
      message: `<b>${texto2}</b>`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
