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
 this.http.get("http://tandoorifood.tn/resto/login.php?mail="+this.mail+"&mdp="+this.psw).subscribe( 
   res=>{
     this.data=res ;
     console.log(this.data.result); 
     if(this.data.result=="1" && this.data.etat=="Activer")
     { this.us.setEmail(this.mail); 
      this.getName(); 
      console.log(this.us.getEmail()); 
       this.navCtrl.setRoot(TabsPage); 
       console.log(this.data.result); 
     }else
     if (this.data.result=="1" && this.data.etat!="Activer"){ 
      let alert = this.alertCtrl.create({ 
        title:'erreur', 
        subTitle:'Votre compte a été bloquer ou pas encore confirmer ',
        buttons:[{ 
          text:'ok', 
          handler:()=>{ 
            console.log('ok '); 
          }
        }]
      }); 
      alert.present(); 
     } else { 
       let toast =this.toast.create({
         position:'bottm',
         duration:3000, 
         message:'adresse ou mot de passe incorrect !'

       }); 
       toast.present() ; 
     }
     
   }
 )
  
  //


 
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
