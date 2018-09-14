import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, IonicPage, ToastController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { produit } from '../../models/produit';
import { HomePage } from '../home/home';
/**
 * Generated class for the SodaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-soda',
  templateUrl: 'soda.html',
})
export class SodaPage {
  name:any ; 
  items:any; 
  ing:any ;
  produits:Array<produit>=[]; 
  ingredient:Array<any>=[]; 
 supplement:string; 
 commande:string ; 
 option:string; 
 user:string;
 qte:string; 
 //isToggled:boolean; 
 prix_tt : string ; 
 prix_unit:string ; 
  constructor( private app:App, public navCtrl: NavController, public navParams: NavParams, private AlrtCtrl: AlertController,private http:HttpClient,private us:RestProvider,private Toast:ToastController) {
    this.user=this.us.getEmail(); 
    this.name=this.us.getName(); 
    this.supplement="-"; 
    this.option="-"; 
    //this.isToggled=false ; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PizzaPage');
    this.getBoisson(); 
    
  }
  AddCart()
  { let alert = this.AlrtCtrl.create({ 
    title:"confirmation",
    subTitle:"Voulez vous Confirmez votre commande ? ",
    buttons:[
      { 
        text:"Confirmer",
        handler:()=>{
          this.Ajout_panier(); 
          console.log('confirmer'); 

          this.navCtrl.setRoot(TabsPage); 
        }
      }, {
        text:'Annnuler',
        handler:()=>{
          console.log("Annuler"); 
        }
      }
    ]
  }); 
  alert.present(); 
    
  }

 
 
  Exit()
  { this.app.getRootNavs()[0].setRoot(HomePage); 
     
  }
  Calcul_prix()
  { var prix_total : number ; 
    console.log("prix unitaire : ", )
    prix_total=Number.parseFloat(this.convertions(this.prix_unit).toString
  ())*Number.parseFloat(this.qte.toString());
  this.prix_tt=prix_total.toString(); 
  console.log("SOmme finale :", prix_total);  

  }
  getBoisson()
  {
    this.http.get("http://tandoorifood.tn/resto/Boisson.php").subscribe(data=>{ 
      this.items=data ;
      console.log(this.items); 
     var prod:produit; 
     
     
    /* console.log("this.items.result",this.items.result[0]); 
     prod=this.items.result[0][1]; 
     console.log("this.prod",prod); 
     console.log("this.items.result",this.items.result[1]); 
     prod=this.items.result[1][1]; 
     console.log("this.prod",prod); */
   
     for(var j=0 ;j<this.items.length;j++)
     { prod = new produit(); 
       prod.nom_produit=this.items[j][1] ; 
      prod.prix_produit=this.items[j][3]; 
      
       
       this.produits.push(prod); 
       
     }
         
   
    }); 
  
  }
  convertions( s1:string ):number
  { 
   var pos= s1.indexOf(',',1); 
   let result= s1.slice(0,pos)+"."+s1.slice(pos+1); 
   console.log(result); 
  return Number.parseFloat(result);  
  }

 

Ajout_panier()
{ 
  if(this.commande==""|| this.qte=="")
  { 
    let toast = this.Toast.create({ 
      message:'Veuillez remplir tout les champs ', 
      duration:3000, 
      position:'top'
    }); 
    toast.present(); 
  }else
  {  
    this.Calcul_prix(); 
    this.http.get("http://tandoorifood.tn/resto/ajoutpanier.php?produit="+this.commande+"&supplement="+this.supplement+"&email="+this.user+"&Qte="+this.qte+"&options="+this.option+"&prix_tt="+this.prix_tt+"&type=Boisson").subscribe(
      data=>{ 
        console.log(data); 
        
      }
    )
  }

 

}
Prix( pr:string)
{ 
  this.prix_unit =pr ; 
  console.log(this.prix_unit); 
  
}
}
