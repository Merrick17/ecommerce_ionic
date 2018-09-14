
import { Injectable } from '@angular/core';

/*
  Generated class for the CrudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CrudProvider {
private nom:string ;
private id :string;  
  constructor() {
    
    this.nom=""; 
    this.id=""; 
  }
 setNom(nom:string)
 {
   this.nom = nom  ; 
 }
 setId(id:string)
 { 
   this.id = id ; 
 }


 getNom():string
 { 
   return this.nom; 
 }
 getId():string
 { 
   return this.id ; 
 }
}
