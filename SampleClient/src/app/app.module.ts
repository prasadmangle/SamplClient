import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductService } from './product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { AUTH_PROVIDERS } from './auth.service';
import { UserService } from './user.service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'admin', component: AdminComponent },
  { path: 'product/:id', component: ProductdetailsComponent },
  { path: 'add-product', component: AddProductComponent },

  // authentication demo
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoggedInGuard]
  },
];



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductlistComponent,
    AdminComponent,
    HomeComponent,
    ProductdetailsComponent,
    AddProductComponent,
    StarRatingComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot(routes)

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    ProductService,
    AUTH_PROVIDERS,
    LoggedInGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
