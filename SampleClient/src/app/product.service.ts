import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from './product';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: Http) {
  }

  //retriving products
  getProducts() {
    return this.http.get('http://localhost:3000/api/products')
      .map(res => res.json());
  }

  getOneProduct(id) {
    return this.http.get('http://localhost:3000/api/products/' + id)
      .map(res => res.json());
  }

  addProduct(newProduct) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/products', newProduct, { headers: headers })
      .map(res => res.json());
  }

  updateOneProduct(product: Product) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.patch('http://localhost:3000/api/products/' + product._id, product, { headers: headers })
      .map(res => res.json());
  }

  removeProduct(id) {
    return this.http.delete('http://localhost:3000/api/products/' + id)
      .map(res => res.json());
  }

  addComment(product, comment) {
    console.log(comment);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log(product);

    return this.http.post('http://localhost:3000/api/comments/' + comment, product, { headers: headers })
      .map(res => res.json());
  }

  addRating(product, userEmail, starratings) {
    if (starratings === null)
      return;
    console.log(starratings);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const request = {
      "_id": product._id,
      "userEmail": userEmail
    }

    return this.http.post('http://localhost:3000/api/starratings/' + starratings, request, { headers: headers })
      .map(res => res.json());
  }

  removeComment(product, comment) {
    console.log("inside service removeComment");
    console.log(comment);
    console.log(product);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var data = {
      comment_id: comment._id,
      product_id: product._id
    }

    return this.http.post('http://localhost:3000/api/comments/', data, { headers: headers })
      .map(res => res.json());
  }

}
