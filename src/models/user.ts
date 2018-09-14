export class user 

{ 

     
    private email : string ; 
     private name : any ; 

    getEmail():string
    { 
        return this.email ; 
    }

    setEmail(em:string)
    { 
        this.email=em ; 
    }
    getName()
    { 
        return this.name ; 
    }
    setName( nm:any)
    {  this.name = nm ; 
        
    }

}