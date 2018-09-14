import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { detail_panier } from '../../models/detail_panier';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the DetailCommandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-commande',
  templateUrl: 'detail-commande.html',
})
export class DetailCommandePage {
private id:any ; 
produits:Array<any>=[]; 
 panier:Array<detail_panier>; 
 items:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController,private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailCommandePage');
    
  }



  CloseModal()
  { 
    this.viewCtrl.dismiss(); 
  }
  
  ionViewWillEnter()
  { this.id=this.navParams.get('commande') ; 
  console.log(this.id); 
    this.produits=[]; 
    this.panier=[]; 
    this.getDetail(); 
  
  }
  
  getDetail()
  { 

    this.http.get("http://tandoorifood.tn/resto/detailcommande.php?id_cmd="+this.id).subscribe(    data=>{ 
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
      var cmd:detail_panier ;  
     for(var i=0;i<this.produits.length;i++)
     { cmd= new detail_panier(); 
      
      cmd.prix=this.produits[i].prix
      cmd.produit=this.produits[i].produit ; 
      cmd.options=this.produits[i].options ;
      cmd.type=this.produits[i].type ;   
     this.panier.push(cmd); 
      
      
     }
     
    }else
    { 
      /*this.commande=[]; */
    }
      console.log(this.produits); 
     //console.log(this.commande); 
   
     data=null ; 
   
    });
    
  }

     
     
    




}
