import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  encuestador = null;

  constructor() { }

  ngOnInit() {
  }

  onSelectChange(evt) {
    const id = evt.target.value;
  }

}
