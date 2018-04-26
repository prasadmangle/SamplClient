import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})



export class ProductlistComponent implements OnInit {

   products: string[] = ["P1","P2","P3","P4","P5"  ];
  
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/products').subscribe(data => {
      console.log(JSON.stringify(data));
    });
  }
  }

}
