import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { TweenMax, Power4 } from 'gsap';

import {CategorieService}from'../categorie.service';
import{Categorie} from'../models/categorie';

import{Market} from '../models/market';
import {MarketService} from '../market.service';
const image_url: String = 'http://localhost:3000/upload/';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
 
  malist: any = new Array();
  market:Market=new Market('','','','','');
  categorie:Categorie=new Categorie('','','');
  produit: Product = new Product('', '', 0, this.categorie,this.market ,'default_product.png');


  constructor(private _productService: ProductService) {
  }

  ngOnInit() {
    this._productService.getAllProducts().subscribe(data => {
      this.malist = data;
      this.malist.map((product) => {
        console.log('product:', product);
        if (product.photo_url) {
          product.photo_url = image_url + product.photo_url;
        }
      })
      console.log(data);
    });
  }
  animateProduit() {
    TweenMax.to('img', .5, { y: -50, x: +50, ease: Power4.easeOut });
    TweenMax.to('img', .5, { y: +100, x: -100, ease: Power4.easeOut });
  }
}
