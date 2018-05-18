import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  name:string;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  addProduct(){
    const newProduct = {
      name : this.name
    }

    this.productService.addProduct(newProduct)
    .subscribe(product=>{
      console.log("Product added!!!");
      this.router.navigate(['/admin']);
    });

    this.name = '';
  }

}
