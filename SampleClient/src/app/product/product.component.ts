import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { AdminGuard } from '../admin.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  comment: string;
  starsCount: number;



  @Output() deleteProduct: EventEmitter<Product>;

  constructor(private productService: ProductService, private adminGuard: AdminGuard, private router: Router) {
    this.deleteProduct = new EventEmitter();
  }

  ngOnInit() {

  }

  @Input() product: Product;

  deleteClickHandler() {
    this.deleteProduct.emit(this.product);
  }

  removeCommentHandler(comment) {
    console.log(comment);
    var res = this.productService.removeComment(this.product, comment)
      .subscribe(product => {
        this.product = product;
      });
    console.log(res);
  }

  NavigateToDetails() {
    this.router.navigate(['/product', this.product._id]);
  }


}
