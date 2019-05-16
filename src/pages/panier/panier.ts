import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController,   ActionSheetController, IonicPage, App } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { NgZone  } from '@angular/core';
import { Events } from 'ionic-angular';
import { CrudProvider } from '../../providers/crud/crud';
import { UpdateorderPage } from '../updateorder/updateorder';
import { produit } from '../../models/produit';
import { detail_panier } from '../../models/detail_panier';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-panier',
  templateUrl: 'panier.html',
})
export class PanierPage {
//user:string; 
//items:any; 
 //produits:Array<any>=[]; 
 panier:any=[]; 
 image:string ; 
 
 affiche:boolean ; 
  constructor( private app:App , public navCtrl: NavController, public navParams: NavParams,private http : HttpClient,private us:RestProvider,private AlertCtrl:AlertController,private toast:ToastController,public events: Events,
    private zone: NgZone,public actionSheetCtrl:ActionSheetController,private cr:CrudProvider) {
    
    this.affiche=true ; 
    
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
    //this.getPanier(); 
  
  }
  Exit()
  { this.app.getRootNavs()[0].setRoot(HomePage); 
     
  }
  showImage(im:string):string 
  { if(im.indexOf("Sandwish")!=-1)
  {
    this.image="1.jpeg"; 
  }else
  if( im.indexOf("Pizza")!=-1)
  { 
    this.image="5.jpg"; 
  }
  else
  {
    this.image="3.jpg"; 
  }
    
      
    
    return this.image ; 
  }
  ionViewWillEnter(){
   
    this.getPanier(); 
    console.log(this.panier); 
    if(this.panier.length==0)
    { 
      this.affiche=false ; 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PanierPage');
     
   
  }
 ionViewWillLeave()
 { 
  this.panier=[] ; 
 
 }

  getPanier()
  { this.panier=[]; 
    let id = localStorage.getItem('id'); 
    this.http.get('http://localhost:3000/cart/'+id).subscribe(data=>{
      console.log("data",data); 
    })
    
      
    
   }
     
    
}
 

