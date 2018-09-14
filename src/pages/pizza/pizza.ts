import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, IonicPage, App } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import {TabsPage} from '../tabs/tabs'; 
import { promotion } from '../../models/prmotion';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
})
export class PizzaPage {
  items:any; 
  ing:any ;
  promotions:Array<any>=[]; 
  prom:promotion ; 
 user:string;
 qte:string; 
 
  constructor( private app :App,public navCtrl: NavController, public navParams: NavParams, private AlrtCtrl: AlertController,private http:HttpClient,private us:RestProvider) {
   
  }

  ionViewDidLoad() {
   this.getPromotion(); 
  }
 getPromotion()
 { 
   this.http.get("http://tandoorifood.tn/resto/promotions.php").subscribe(data=>{ 
  this.items=data; 
  var prom :promotion ; 
  console.log(this.items); 
  for(var i=0; i<this.items.length;i++)
  { 
    prom = new promotion(); 
    prom.date=this.items[i][3]; 
    prom.promotion=this.items[i][1]; 
    this.promotions.push(prom); 
  }
   
   }); 
 }
 Exit()
{ this.app.getRootNavs()[0].setRoot(HomePage); 
   
}

  
}
