import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
  providers : [ProductService]
})



export class ProductlistComponent implements OnInit {

   //products: string[] = ["P1","P2","P3","P4","P5"  ];
   products : Product[];
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(p => this.products = p);
  }  

}
