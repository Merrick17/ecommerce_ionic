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
user:string; 
items:any; 
 produits:Array<any>=[]; 
 panier:Array<detail_panier>; 
 image:string ; 
 
 affiche:boolean ; 
  constructor( private app:App , public navCtrl: NavController, public navParams: NavParams,private http : HttpClient,private us:RestProvider,private AlertCtrl:AlertController,private toast:ToastController,public events: Events,
    private zone: NgZone,public actionSheetCtrl:ActionSheetController,private cr:CrudProvider) {
    this.user=this.us.getEmail(); 
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
  this.produits=[] ; 
 }

  getPanier()
  { this.panier=[]; 
    this.produits=[] ; 
    this.http.get("http://tandoorifood.tn/resto/affichepanier.php?email="+this.user).subscribe(
      data=>{ 
        //console.log(data); 
        //this.prod.push(JSON.stringify(data))  ; 
      this.items=data ; 
      var prod:any; 
      this.panier=[]; 
      this.produits=[]; 
    var pan : detail_panier ; 
    if(this.items.result!=null)
    { 
      for(var i=0;i<this.items.result.length;i++)
      { 
        prod=this.items.result[i][1]; 
        this.produits.push(prod); 
      }
    
     for(var i=0;i<this.produits.length;i++)
     { pan = new detail_panier(); 
      pan.id_detail=this.produits[i].id_detail ; 
      pan.options=this.produits[i].options ; 
      pan.produit=this.produits[i].produit ; 
      pan.Qte=this.produits[i].Qte_produit ; 
      pan.supplement=this.produits[i].supplement ;
      pan.prix=this.produits[i].prix 
      pan.type=this.produits[i].type ; 
       //prod=this.produits[i]; 
     this.panier.push(pan); 
      
      
     }
    }
     
     
     console.log("liste panier",this.panier); 
   
     data=null ; 
      }
    );
    if(this.panier==null)
    { 
      var p : detail_panier ; 
      p = new detail_panier(); 
      this.panier.push(p); 
    }
  }
  SupprimerPanier( id_detail:string)
  {  let index=this.findIndex(id_detail); 
    let alert = this.AlertCtrl.create({ 
      title:'supression', 
      subTitle:'voulez vous supprimer ce produit ? ',
      buttons:[{ 
        text:'Oui',
        handler:()=>{ 
          this.http.get("http://tandoorifood.tn/resto/supprimerpanier.php?email="+this.user+"&id_detail="+id_detail).subscribe(res=>{ 
            console.log(res); 
           //this.panier.splice(index,1); 
           console.log("Id est : ",index )
          
          }); 
        
         
        }
      }, 
    { 
      text:'non', 
      handler:()=>{ 
        console.log('annuler'); 
      }
    }]
    }); 
    alert.present();
  }

  findIndex(str:string):number 
  { 
    for(var i=0 ; i< this.panier.length;i++)
    { 
      if(this.panier[i].id_detail==str)
      { 
        return i ; 
        
      }
    }
  }

  Options(produit:any,id:string)
  { 
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.SupprimerPanier(id); 
          }
        },
        {
          text: 'Modifer',
          handler: () => {
            this.Modifier(id,produit); 
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present(); 
  }
ConfirmerCommande()
{
  this.http.get("http://tandoorifood.tn/resto/passercommande2.php?email="+this.user).subscribe(data=>{ 
    console.log(data); 
    
    let toast=this.toast.create({
      message: 'Commande Ajouter !!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present(); 
   
   
  }); 
  while(this.panier.length!=0)
  { 
    this.panier.splice(0,1); 
  }
  
}

Modifier(id:string , nom:string)
{ 
  console.log("produit===",nom); 
  this.cr.setNom(nom); 
  this.cr.setId(id); 
  console.log("Getnom",this.cr.getNom()); 
  this.navCtrl.push(UpdateorderPage); 
}
}
