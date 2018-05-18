import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  comment: string;
  starsCount: number;
  displayRatingScore = 5;


  @Output() deleteProduct: EventEmitter<Product>;

  constructor(private productService: ProductService) { 
    this.deleteProduct = new EventEmitter();
  }

  ngOnInit() {
    this.starsCount = 4;
  }

  @Input() product: Product;

  deleteClickHandler() {
    this.deleteProduct.emit(this.product);
  }

  removeCommentHandler(comment) {
    console.log(comment);
    var res = this.productService.removeComment(this.product,comment)
    .subscribe(product => {
      this.product = product;
    });
    console.log(res);
  }

  addComment() {

    this.productService.addComment(this.product, this.comment)
      .subscribe(product => {
        //this.product.comments.push({ body: this.comment });
        this.product = product;
        this.comment = "";
      });

  }

}
