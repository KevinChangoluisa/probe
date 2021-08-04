import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';



@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})

export class EncuestasPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  lngCel: number = 0;
  latCel: number = 0;
  cedEnc: number = 0;
  cedSup: number = 0;
  fecha: string = "";
  tiempototal: number = 0;

  preguntas: Observable<any>;
  invisible: boolean = false
  respuestas = []
  envio = {};
  boton: boolean = false;
  timeA: any;
  timeB: any;
  fn: string;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };


  constructor(
    private dataService: DataService,
    private geolocation: Geolocation,
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.timeA = moment();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lngCel = Number(resp.coords.longitude);
      this.latCel = Number(resp.coords.latitude);
    })


    var datos = JSON.parse(this.route.snapshot.paramMap.get('cedula'))
    this.cedEnc = datos.cedulas.encCed
    this.cedSup = datos.cedulas.encSup
    this.fn = datos.fullname
    this.fecha = moment().format('L')
    this.preguntas = this.dataService.getPreguntas();
    this.slides.lockSwipeToNext(true);
  }


  GuardarRespuestas(i: number, pregunta: string, opcion: string) {
    if (pregunta != undefined) {
      this.invisible = true;
      this.slides.lockSwipeToNext(false);
      this.slides.slideNext();
      this.slides.lockSwipeToPrev(true);
      this.slides.lockSwipeToNext(true);
      this.invisible = false;
      this.respuestas.push(opcion)

      if (i == 10) {
        this.boton = true
        this.invisible = true;
        this.timeB = moment();
      }
    }

  }

  almacenar() {

    var duration = this.timeB.diff(this.timeA, 'seconds')
    this.tiempototal = duration;
    this.envio = {
      'cedEnc': this.cedEnc,
      'cedSup': this.cedSup,
      'fecha': this.fecha,
      'duracion': this.tiempototal,
      'latitud': this.latCel,
      'longitud': this.lngCel,
      'respuestas': this.respuestas
    }
    this.dataService.postRespuestas(JSON.stringify(this.envio)).subscribe(data => {
      console.log(data)
    })

    this.navCtrl.navigateForward(`/home/encuestador/${JSON.stringify({ fullname: this.fn, cedula: this.cedEnc })}`)
  }


}
