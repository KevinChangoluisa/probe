import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  encuestadoresSeleccionados = [null, null, null];
  listaEncuestadores = [];

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getEncuestadores().subscribe((resp: any[]) => {
      this.listaEncuestadores = resp;
    });
  }

  nextPage() {
    if (this.encuestadoresSeleccionados.includes(null)) {
      console.log('object');
      return;
    }

    const navigationExtras: NavigationExtras = {
      state: {
        user: this.encuestadoresSeleccionados,
      },
    };
    this.router.navigate(
      ['home', 'supervisor', 'numero-encuestas'],
      navigationExtras
    );
  }

  onSelectChange(evt, pos: number) {
    const id = evt.target.value;
    this.encuestadoresSeleccionados[pos] = this.listaEncuestadores.find(
      (e) => e.id === id
    );

    console.log(this.encuestadoresSeleccionados);
  }
}
