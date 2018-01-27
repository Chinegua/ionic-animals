import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales' 
import { Animal } from "../../interface/animal.interface";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0); //COn slice hacemos un clon del objeto animales y no modificamos el original
    console.log(this.animales);
  }
  reproducir(animal:Animal){
    console.log(animal)

    let audio = new Audio();
    audio.src = animal.audio;
    animal.reproduciendo = true;
    audio.load();
    audio.play();
    setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000);
  }

}
