import { Component, OnInit } from '@angular/core';
import { DaneService } from '../dane.service';
import { Klucz } from '../modele/klucz.model';
import { Page } from '@nativescript/core';
import { RouterExtensions } from 'nativescript-angular/router';
import * as utils from "@nativescript/core/utils/utils";

@Component({
  selector: 'ns-szczegoly-klucza',
  templateUrl: './szczegoly-klucza.component.html',
  styleUrls: ['./szczegoly-klucza.component.css'],
  moduleId: module.id,
})
export class SzczegolyKluczaComponent implements OnInit {

  constructor(private page: Page ,private dane: DaneService, private router: RouterExtensions) { }

  klucz: Klucz =  {id: 1, rfid: '100000', tytul: '', zagadka: '', link: 'https://www.google.pl/maps/@50.0217305,21.9915194,15.46z', data_zebrania: '06.12.2019 16:14'};
  data: Date;

  ngOnInit() {
    this.page.actionBarHidden = true
    this.klucz = this.dane.WybranyKlucz;
    this.data = new Date(this.klucz.data_zebrania)
    this.data.setHours(this.data.getHours() + 2)

  }

  powrot()
  {
    this.router.backToPreviousPage()
  }

  otworzMape()
  {
    utils.openUrl(this.klucz.link)
  }

}
