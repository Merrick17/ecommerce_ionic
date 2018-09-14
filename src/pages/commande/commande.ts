import { Component } from '@angular/core';
import {  NavController, NavParams, IonicApp, IonicPage, App, ModalController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { CrudProvider } from '../../providers/crud/crud';
import { UpdateorderPage } from '../updateorder/updateorder';
import { HomePage } from '../home/home';
import { commande } from '../../models/commande';

@IonicPage()
@Component({
  selector: 'page-commande',
  templateUrl: 'commande.html',
})
export class CommandePage {
user:string; 
items:any; 
  produits:Array<any>=[]; 
  commande:Array<commande>=[]; 
  constructor(private app:App, private modalCtrl:ModalController ,public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,private us:RestProvider,private cr:CrudProvider) {
    this.user=this.us.getEmail(); 
    
   
  }
  Exit()
  { this.app.getRootNavs()[0].setRoot(HomePage); 
     
  }
ionViewWillEnter()
{ this.produits=[]; 
  this.commande=[]; 
  this.getCommande(); 

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandePage');
    //this.getCommande(); 
  }
 
  getCommande()
  { 

    this.http.get("http://tandoorifood.tn/resto/affichecommande.php?email="+this.user).subscribe(    data=>{ 
      //console.log(data); 
      //this.prod.push(JSON.stringify(data))  ; 
      //this.prod.push(JSON.stringify(data))  ; 
      this.items=data ; 
      var prod:any; 
     /* console.log("this.items.result",this.items.result[0]); 
      prod=this.items.result[0][1]; 
      console.log("this.prod",prod); 
      console.log("this.items.result",this.items.result[1]); 
      prod=this.items.result[1][1]; 
      console.log("this.prod",prod); */
    if(this.items!=null)
    { 
      for(var i=0;i<this.items.length;i++)
      { 
        prod=this.items[i][1]; 
        this.produits.push(prod); 
      }
      //console.log(this.produits); 
      var products:Array<any>=[];
      var cmd:commande ;  
     for(var i=0;i<this.produits.length;i++)
     { cmd= new commande(); 
      cmd.id_commande=this.produits[i].id_commande
      cmd.prix=this.produits[i].prix_total ; 
      cmd.etat=this.produits[i].etat ; 
      cmd.date=this.produits[i].date_commande ;  
     this.commande.push(cmd); 
      
      
     }
     
    }else
    { 
      this.commande=[]; 
    }
      console.log(this.produits); 
     console.log(this.commande); 
   
     data=null ; 
   
    });
    
  }


  ionViewWillLeave()
 { 
  this.commande=null ; 
  this.produits=null ; 
 }


 ShowModal( id_cmd:any)
 { 
   let modal = this.modalCtrl.create('DetailCommandePage',{commande:id_cmd}); 
   modal.present(); 
 }
}
