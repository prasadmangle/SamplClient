import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Product} from './product';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: Http) {    
   }

   //retriving products
   getProducts(){
     return this.http.get('http://localhost:3000/api/products')
     .map(res => res.json());
   }

   addProduct(newProduct){
     var headers = new Headers();
     headers.append('Content-Type','application/json');

     return this.http.post('http://localhost:3000/api/products',newProduct,{headers:headers})
     .map(res=>res.json());
   }

   removeProduct(id){
     return this.http.delete('http://localhost:3000/api/products/'+id)
     .map(res=> res.json());
   }

}
