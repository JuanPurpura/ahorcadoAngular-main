import { Component } from '@angular/core';
import { Palabra } from 'src/app/models/palabra';
import { PalabraService } from 'src/app/providers/palabra.service';

@Component({
  selector: 'app-agregar-palabra',
  templateUrl: './agregar-palabra.component.html',
  styleUrls: ['./agregar-palabra.component.css']
})
export class AgregarPalabraComponent {

  palabraNueva= '';
  alertErr = false;
  alertOk = false;
  arrPalabras: Palabra[] = [];
  alertErr2 = false;

  constructor(private palabraServ: PalabraService){
    this.palabraServ.getConexion().then( ()=>{
      console.log('conexion exitosa!');
      this.arrPalabras = this.palabraServ.getArrPalabras();

    }).catch( (err)=>{
      console.log(err);
    });

  }

  getPalabrasSeparadas(): string {
    return this.arrPalabras.map(palabra => palabra.palabra).join(', ');
  }

  AgregarPalabra() {
    const regex = /^[a-z]+$/;
  
    if (regex.test(this.palabraNueva)) {
      console.log(this.palabraNueva);
      this.palabraServ.agregarPalabra(this.palabraNueva).then(() => {
        this.alertOk = true;
        setTimeout(() => {
          this.alertOk = false;
          this.palabraNueva = '';
        }, 2000);
      }).catch(() => {
        this.alertErr = true;
        setTimeout(() => {
          this.alertErr = false;
        }, 2000);
      });
    } else {
      this.alertErr2 = true;
      setTimeout(() => {
        this.alertErr2 = false;
      }, 4000);
    }
  }
  


}
