import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController, IonicPage } from 'ionic-angular';
import { RegisterPage } from '../register/register';

import { TabsPage } from '../tabs/tabs';

import { HttpClient } from '../../../node_modules/@angular/common/http';
//import { Observable } from '../../../node_modules/rxjs/Observable';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mail:string; 
  psw:string; 
  data:any
  nom:any ; 
  constructor(public navCtrl: NavController, private alertCtrl:AlertController, private http:HttpClient, private us:RestProvider,private toast : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
 


  Register()
  {
    this.navCtrl.setRoot(RegisterPage); 
  }
Forgot()
{ let alert = this.alertCtrl.create({
  title:"Mot de passe oublier", 
  inputs:[
    {
      name:'Email',
      placeholder:'Email'
    }
  ],
  buttons:[ 
    { text:'Envoyer',
      handler:()=>{ 
        console.log('email enovyer'); 
      }
      
    },
    { text:'Annuler',
      handler:()=>{ 
        console.log('email Annuler'); 
      }
      
    }
  ]

}); 
alert.present(); 

}


login()
{ 
this.http.post('http://localhost:3000/users/login',{
  'email': this.mail ,
  'password':this.psw
}).subscribe(data=>{
  let result:any ; 
  console.log(result); 
  this.navCtrl.setRoot(TabsPage); 
})
}
getName()
{ 
  this.http.get("http://tandoorifood.tn/resto/getNom.php?mail="+this.mail+"&mdp="+this.psw).subscribe(
    res=>{ 
        this.nom=res ; 
        var fullname : string ; 
        fullname=this.nom.result.nom+" "+this.nom.result.prenom ; 
        this.us.setName(fullname); 
        console.log("fullname:",fullname)
    }
  )
}

}
