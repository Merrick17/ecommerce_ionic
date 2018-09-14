
import { Injectable } from '@angular/core';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
 private email:string; 
  private name:any ; 
  constructor() {
   this.email=""; 
   this.name=""; 
  }

  getName()
  { 
      return this.name ; 
  }
  setName( nm:any)
  {  this.name = nm ; 
      
  }

  
  getEmail():string
  {
    return this.email; 
  }
setEmail(em:string) 
{ 
   this.email=em;  ; 
}
}
