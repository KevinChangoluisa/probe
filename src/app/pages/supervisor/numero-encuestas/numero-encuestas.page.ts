import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-numero-encuestas',
  templateUrl: './numero-encuestas.page.html',
  styleUrls: ['./numero-encuestas.page.scss'],
})
export class NumeroEncuestasPage implements OnInit {

  data: any[] = [];
  encuestas = [] ;
  total: number;
  faltante: number;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }

  submit() {
    const postData = {
      encuestador1: this.data[0].cedula,
      encuestador2: this.data[1].cedula,
      encuestador3: this.data[2].cedula,
      numeroEncuestas1: this.encuestas[0],
      numeroEncuestas2: this.encuestas[1],
      numeroEncuestas3: this.encuestas[2],
      total: this.total,
      faltante: this.faltante
    };

    this.dataService.enviarNumeroEncuestas(postData).subscribe(resp => {
      console.log(resp);
    });
  }

}
