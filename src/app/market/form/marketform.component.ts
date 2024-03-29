import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { MarketListeComponent } from '../listes/marketlist.component';
import { MarketService } from '../../market.service';
import { Market } from '../../models/market';
import 'rxjs';

@Component({
  selector: 'app-marketform',
  templateUrl: './marketform.component.html',
  styleUrls: ['./marketform.component.css']
})
export class MarketformComponent implements OnInit {
  private context: String = 'ADD';
  private errorMessage: String = '';
  private Btn_SaveAdd_label = 'Add Market';

  @Input() private currentMarket: any;

  constructor(private _marketService: MarketService) { }

  ngOnInit() {
    this.currentMarket = { _id: '', market_name: '', Adresse: '', ville: '' };
  }

  onChangeMarket_Name() {

    if (this.currentMarket._id === '') {
      this.context = 'ADD';
       this.Btn_SaveAdd_label = 'Add Market';
    } else {
      this.context = 'UPDATE';
       this.Btn_SaveAdd_label = 'Update Market';
    }
  }

  addOrEdit(context, market) {
    switch (context) {
      case 'ADD':
        this.addCurrentMarket(market)

        break;
      case 'UPDATE':
        this.updateCurrentMarket(market);
        break;
    }
  }

  public updateCurrentMarket(theMarket) {
    let body = { market_name: '', Adresse: '', ville: '' };
    body.market_name = theMarket.market_name;
    body.Adresse = theMarket.Adresse;
    body.ville = theMarket.ville;
    
    this._marketService
      .updateMarkets('http://localhost:3000/markets/' + theMarket._id, body)
      .subscribe(
      result => console.log(result),
      error => this.errorMessage = <any>error
      );

    this.currentMarket = { _id: '',  market_name: '', Adresse: '', ville: '' };
  }

  public addCurrentMarket(theMarket) {
    let body = { market_name: '', Adresse: '', ville: '' };
    body.market_name = theMarket.market_name;
    body.Adresse = theMarket.Adresse;
    body.ville = theMarket.ville;
    

    this._marketService
      .addMarkets(body)
      .subscribe(
      result => console.log(result),
      error => this.errorMessage = <any>error
      );
    this.currentMarket = { _id: '',  market_name: '', Adresse: '', ville: '' };
  }

}
