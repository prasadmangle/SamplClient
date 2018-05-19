import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';
import { Router } from '@angular/router';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
  providers : [ProductService]
})



export class ProductlistComponent implements OnInit {

   //products: string[] = ["P1","P2","P3","P4","P5"  ];
   products : Product[];
   name:string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(p => this.products = p);
  }  

  addProduct(){
    const newProduct = {
      name : this.name
    }

    this.productService.addProduct(newProduct)
    .subscribe(product=>{
      this.products.push(product);
    });

    this.name = '';
  }

  removeProduct(product){

    var products = this.products;
    this.productService.removeProduct(product._id)
    .subscribe(data=>{
      
      
        for(var i =0; i< products.length;i++)
        {
          

          if(products[i]._id == product._id)
          {
            console.log(i +"-"+products[i]._id+ "-"+products[i].name+"<-- Deleted");
            products.splice(i,1);            
          }
          else
          {
            console.log(i +"-"+products[i]._id+ "-"+products[i].name);
          }
        }
      
    })
    
  }

}
