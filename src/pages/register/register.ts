import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams, UrlSerializer, ToastController, AlertController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

import { user } from '../../models/user';

import { HttpClient } from '../../../node_modules/@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 nom:string;
 prenom:string;
  adr:string;
   mdp:string;
  tel:string;
 email:string ; 
data : any ; 
 zone:string; 



  constructor(public navCtrl: NavController, public navParams: NavParams,private http : HttpClient, private toast: ToastController,private AlertCtrl:AlertController) {
    
    this.nom=""
    this.mdp=""
    this.prenom=""
     this.tel=""
     this.zone=""
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
login()
{
  this.navCtrl.setRoot(HomePage); 
}
connect()
{ 

  this.navCtrl.setRoot(TabsPage); 
}


verif()
{ 
  if(this.nom.length==0 || this.mdp.length==0 || this.prenom.length==0 || this.tel.length==0 || this.zone.length==0)
  { 
    let toast = this.toast.create({ 
      message:'Veuillez remplir les champs !',
      duration:3000, 
      position:'bottom'

    }); 
    toast.present(); 
  }else
  { 

    this.http.get("http://tandoorifood.tn/resto/signup.php?nom="+this.nom+"&prenom="+this.prenom+"&adr="+this.adr+"&mdp="+this.mdp+"&tel="+this.tel+"&email="+this.email+"&zone="+this.zone)
    .subscribe(res => {
     //console.log(JS.stringify(res)) ; 
     this.data=res ; 
     if(this.data.result=="0")
     { 
       let alert = this.AlertCtrl.create({ 
         title:'Erreur', 
         subTitle:'Adrese déja existe ',
         buttons:[{
           text:'OK',
           handler:()=>{ 
             console.log('erruer'); 
           }
         }]
       });
       alert.present(); 
     }else 
     { let ts=this.toast.create({ 
       message:'en attendant la confirmation ',
       duration:3000, 
       position:'top'
        

     }) ; 
     ts.present(); 
       this.navCtrl.setRoot(HomePage); 
     }
})




  }
}


insert(){
 
 
    this.http.get("http://tandoorifood.tn/resto/signup.php?nom="+this.nom+"&prenom="+this.prenom+"&adr="+this.adr+"&mdp="+this.mdp+"&tel="+this.tel+"&email="+this.email+"&zone="+this.zone)
      .subscribe(res => {
       //console.log(JS.stringify(res)) ; 
       this.data=res ; 
       if(this.data.result=="0")
       { 
         let alert = this.AlertCtrl.create({ 
           title:'Erreur', 
           subTitle:'Adrese déja existe ',
           buttons:[{
             text:'OK',
             handler:()=>{ 
               console.log('erruer'); 
             }
           }]
         });
         alert.present(); 
       }else 
       { let ts=this.toast.create({ 
         message:'en attendant la confirmation ',
         duration:3000, 
         position:'top'
          

       }) ; 
       ts.present(); 
         this.navCtrl.setRoot(HomePage); 
       }
  })
  
  
  }
 
  
}
