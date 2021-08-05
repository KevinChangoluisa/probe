import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';
import { FirestorageService } from '../../services/firestorage.service';


@Component({
  selector: 'app-encuestador',
  templateUrl: './encuestador.page.html',
  styleUrls: ['./encuestador.page.scss'],
})
export class EncuestadorPage implements OnInit {

  public nombreEncuestador: string = ""
  public nombreSupervisor: string = ""
  public cedulaEncuestador: string = ""
  public cedulaSupervisor: string = "1718123321"

  public numEncuestasRealizadas: number;
  public numEncuestasfaltantes: number = 100;
  public hoy: string;
  foto: '';
  cedulas = {}

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private firestorageService: FirestorageService,
  ) { }

  ngOnInit() {
    var req = JSON.parse(this.route.snapshot.paramMap.get('user'))
    this.cedulaEncuestador = req['cedula']

    this.nombreEncuestador = req['fullname']

    this.nombreSupervisor = "Pedro Supervisor"
    this.hoy = moment().locale("es").format("LL");

    this.cedulas = {
      encCed: this.cedulaEncuestador,
      encSup: this.cedulaSupervisor,
    };
    var fecha = moment().format('L')
    this.dataService.getTotalTrab(this.cedulaEncuestador, fecha).subscribe(data => {
      this.numEncuestasRealizadas = data['total']
      this.numEncuestasfaltantes = this.numEncuestasfaltantes - this.numEncuestasRealizadas
    })

  }


  agregar() {
    this.navCtrl.navigateForward(`/home/encuestas/${JSON.stringify({ fullname: this.nombreEncuestador, cedulas: this.cedulas })}`)
  }


  async newImagenUpload(event: any) {

    const path = 'usuarios'
    const ced = '1111111111'
    const file = event.target.files[0]
    const res = await this.firestorageService.uploadImage(path, ced, file)
    console.log(res);
    

  }



}
