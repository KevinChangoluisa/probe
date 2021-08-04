import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';


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
  cedulas = {}

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private dataService: DataService,
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



}
