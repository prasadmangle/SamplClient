import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  id: string;
  product: Product = new Product();

  comment: string;
  starsCount: number;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
    this.productService.getOneProduct(this.id).subscribe(p => this.product = p);
    console.log(this.product);
  }

  updateProduct() {
    this.productService.updateOneProduct(this.product).subscribe(p => {
      console.log("Product " + p.name + " updated sucessfully!!!");
      this.router.navigate(['/admin']);
    })
  }

  deleteClickHandler() {
    this.productService.removeProduct(this.product._id);
  }

  removeCommentHandler(comment) {
    console.log(comment);
    var res = this.productService.removeComment(this.product, comment)
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

  redirectToHome(){
    this.router.navigate(['/admin']);
  }
}
