import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  encuestador = null;
  listaEncuestadores = [];

  puntualidad: number;
  responsabilidad: number;
  comentario: string;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getEncuestadores().subscribe((resp: any[]) => {
      this.listaEncuestadores = resp;
    });
  }

  onSelectChange(evt) {
    const id = evt.target.value;
    this.encuestador = this.listaEncuestadores.find(e => e.id === id);
    this.dataService.getRendimiento(this.encuestador.cedula)
      .subscribe((resp: any) => {
        if (Object.keys(resp).length > 0) {
          this.puntualidad = resp.puntualidad ;
          this.responsabilidad = resp.responsabilidad ;
          this.comentario = resp.comentario ;
        } else {
          this.puntualidad = null;
          this.responsabilidad = null;
          this.comentario = null;
        }
      });

  }

  submit() {
    // Cédula supervisor number
    const datos = {
      encuestador: this.encuestador.cedula,
      puntualidad: this.puntualidad,
      responsabilidad: this.responsabilidad,
      comentario: this.comentario,
      fecha: new Date().toISOString
    };

    this.dataService.calificarRendimiento(datos).subscribe(resp => {
      console.log('bien');
    });
  }

}
