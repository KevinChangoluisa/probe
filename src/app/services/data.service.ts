import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getPreguntas() {
    return this.http.get('https://my-json-server.typicode.com/KevinChangoluisa/preguntasJson/preguntas');
  }

  postRespuestas(datos) {
    return this.http.post('https://server.kchangoluisa.repl.co/query-example', datos)
  }

  getRol(cedula, password) {
    return this.http.get(`https://server.kchangoluisa.repl.co/obtenerRol?cedula=${cedula}&password=${password}`);
  }

  getTotalTrab(cedula, fecha) {
    return this.http.get(`https://server.kchangoluisa.repl.co/obtenerTotTrab?cedula=${cedula}&fecha=${fecha}`);
  }




}
