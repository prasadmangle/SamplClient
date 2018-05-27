import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  name: string;
  path: string;

  constructor(private productService: ProductService, private router: Router) { }

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      this.path = response;

      const newProduct = {
        name: this.name,
        imagePath: this.path
      }

      this.productService.addProduct(newProduct)
        .subscribe(product => {
          console.log("Product added!!!");
          this.router.navigate(['/admin']);
        });

      this.name = '';
    };
  }

  addProduct() {
    this.uploader.uploadAll();

  }

}
