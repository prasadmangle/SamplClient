import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output() deleteProduct: EventEmitter<Product>; 

  constructor() { 
    this.deleteProduct = new EventEmitter();
  }

  ngOnInit() {
  }

  @Input() product: Product;

  deleteClickHandler(){
    this.deleteProduct.emit(this.product);
  }

}
