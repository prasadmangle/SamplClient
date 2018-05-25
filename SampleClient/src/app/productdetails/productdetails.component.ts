import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { AdminGuard } from '../admin.guard';
import { LoggedInGuard } from '../logged-in.guard';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  id: string;
  product: Product = new Product();

  comment: string;
  starsCount: number = 0;

  ctrl = new FormControl(null);

  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private adminGuard: AdminGuard,
    private loggedInGuard: LoggedInGuard,
    private authService: AuthService) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
    this.productService.getOneProduct(this.id).subscribe(p => {
      this.product = p
      try {
        if (this.product != null) {
          if (this.product.starRatings != null) {
            var firstRating = this.product.starRatings.filter(x => x.userEmail === this.authService.getUser())[0];
            if (firstRating != null)
              this.starsCount = firstRating.rating;
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    );
    console.log(JSON.stringify(this.product));
  }
  rateClickHandler() {

    if (this.ctrl.value != null) {
      this.productService.addRating(this.product, this.authService.getUser(), this.ctrl.value).subscribe(p => {
        console.log("Rating successfull!!!");
      });
    }

  }

  canDeleteComment(userEmail) {
    if (userEmail === this.authService.getUser() || this.authService.isAdmin()) {
      return true;
    }
    else {
      return false;
    }
  }
  updateProduct() {
    this.productService.updateOneProduct(this.product).subscribe(p => {
      console.log("Product " + p.name + " updated sucessfully!!!");
      this.router.navigate(['/admin']);
    })
  }

  deleteClickHandler() {
    this.productService.removeProduct(this.product._id)
      .subscribe(data => {
        console.log("Item deleted " + data._id);
        this.router.navigate(['/admin']);
      });
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

    this.productService.addComment(this.product, this.comment, this.authService.getUser())
      .subscribe(product => {
        //this.product.comments.push({ body: this.comment });
        this.product = product;
        this.comment = "";
      });

  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
