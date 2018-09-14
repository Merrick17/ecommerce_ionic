import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 mail:string; 
 psw:string; 
 data:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private http:HttpClient, private us:RestProvider,private toast : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
 this.http.get("http://127.0.0.1/resto/login.php?mail="+this.mail+"&mdp="+this.psw).subscribe( 
   res=>{
     this.data=res ;
     console.log(this.data.result); 
     if(this.data.result=="1")
     { this.us.setEmail(this.mail); 
      console.log(this.us.getEmail()); 
       this.navCtrl.setRoot(TabsPage); 
       console.log(this.data.result); 
     }else{ 
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


}
