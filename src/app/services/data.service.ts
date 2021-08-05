import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseURL = 'https://server.kchangoluisa.repl.co';
  baseURL2 = 'https://server-1.wilsonag.repl.co';

  usuario: any = null;

  constructor(private http: HttpClient) {}

  getPreguntas() {
    return this.http.get(
      'https://my-json-server.typicode.com/KevinChangoluisa/preguntasJson/preguntas'
    );
  }

  postRespuestas(datos) {
    return this.http.post(`${this.baseURL2}/query-example`, datos);
  }

  getRol(cedula, password) {
    return this.http
      .get(`${this.baseURL2}/obtenerRol?cedula=${cedula}&password=${password}`)
      .pipe(
        tap((resp) => {
          this.usuario = resp;
        })
      );
  }

  getTotalTrab(cedula, fecha) {
    return this.http.get(
      `${this.baseURL2}/obtenerTotTrab?cedula=${cedula}&fecha=${fecha}`
    );
  }

  getEncuestadores() {
    return this.http.get(`${this.baseURL2}/usuarios/encuestador`);
  }

  calificarRendimiento(datos) {
    return this.http.post(`${this.baseURL2}/rendimiento`, datos);
  }

  getRendimiento(cedula) {
    return this.http.get(`${this.baseURL2}/rendimiento/${cedula}`);
  }

  enviarNumeroEncuestas(data) {
    return this.http.post(`${this.baseURL2}/supervisor/encuestas`, data);
  }
}
