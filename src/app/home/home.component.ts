import { Component, OnInit } from '@angular/core';
import {ProductService}from'../product.service';
import{Product} from '../models/product';
import{MarketService} from '../market.service';
import{Market} from '../models/market';
import {Categorie} from '../models/categorie';
import{CategorieService}from '../categorie.service';
import { User } from './../models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any=[];

  markets:any=[];
  categories:any=[];
  private _avatar_url: string;
  private _user: User;
  constructor(private marketservice : MarketService,private productservice : ProductService,
 private categorieservice:CategorieService) {
  this._user = new User;
 }

  ngOnInit() {

    this._user = JSON.parse(localStorage.getItem('currentUser'));
    this._avatar_url = this.getAvatarPath(this._user.gender);
    this.productservice.getAllProducts().subscribe(data => this.products=data);
    this.marketservice.getAllMarkets().subscribe(data=> this.markets=data);
    this.categorieservice.getAllCategories().subscribe(data=> this.categories=data);
  }
  getAvatarPath(gender: string): string {
    switch (gender.toUpperCase()) {
      case 'HOMME':
        return 'assets/homme.jpg';
      case 'FEMME':
        return 'assets/femme.jpg';
      default: return 'assets/homme.jpg';
    }

  }

 
}
