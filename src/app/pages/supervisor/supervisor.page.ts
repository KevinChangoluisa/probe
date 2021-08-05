import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  encuestador = null;
  encuestadoresSeleccionados = [null, null, null];
  listaEncuestadores = [];

  puntualidad: number;
  responsabilidad: number;
  comentario: string;


  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getEncuestadores().subscribe((resp: any[]) => {
      this.listaEncuestadores = resp;
    });
  }

  onSelectChange(evt, pos: number) {
    const id = evt.target.value;
    this.encuestadoresSeleccionados[pos] = this.listaEncuestadores.find(e => e.id === id);

    console.log(this.encuestadoresSeleccionados);
    // this.dataService.getRendimiento(this.encuestador.cedula)
    //   .subscribe((resp: any) => {
    //     if (Object.keys(resp).length > 0) {
    //       this.puntualidad = resp.puntualidad ;
    //       this.responsabilidad = resp.responsabilidad ;
    //       this.comentario = resp.comentario ;
    //     } else {
    //       this.puntualidad = null;
    //       this.responsabilidad = null;
    //       this.comentario = null;
    //     }
    //   });

  }


  nextPage() {
    if (this.encuestadoresSeleccionados.includes(null)) {
      console.log('object');
      return;
    }

    const navigationExtras: NavigationExtras = {
      state: {
        user: this.encuestadoresSeleccionados
      }
    };
    this.router.navigate(['home', 'supervisor', 'numero-encuestas'], navigationExtras);
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
