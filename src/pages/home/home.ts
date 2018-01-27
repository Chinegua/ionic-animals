import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales' 
import { Animal } from "../../interface/animal.interface";
import { Refresher,reorderArray} from "ionic-angular"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTime:any;
  ordenar:boolean = false;
  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0); //COn slice hacemos un clon del objeto animales y no modificamos el original
    console.log(this.animales);
  }
  reproducir(animal:Animal){
    this.pausarAudio(animal);
    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }
    console.log(animal)

    
    this.audio.src = animal.audio;
    animal.reproduciendo = true;
    this.audio.load();
    this.audio.play();
    this.audioTime = setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000);
  }
  delete(ind:number){
    this.animales.splice(ind ,1 );
  }

  private pausarAudio(animalSel:Animal){
    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales){
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }
    }
  }
  recargar(refresh:Refresher){

    setTimeout( ()=>{

      this.animales = ANIMALES.slice(0); //COn slice hacemos un clon del objeto animales y no modificamos el original
      refresh.complete()

    },1000);
  }

  reorganizar(indice:any){
    console.log(indice);
    this.animales = reorderArray(this.animales,indice);

  }

}
