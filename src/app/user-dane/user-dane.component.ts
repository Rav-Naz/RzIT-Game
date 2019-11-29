import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { DaneService } from '../dane.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RouterExtensions } from 'nativescript-angular/router';
import { UiService } from '../ui.service';

@Component({
  selector: 'ns-user-dane',
  templateUrl: './user-dane.component.html',
  styleUrls: ['./user-dane.component.css'],
  moduleId: module.id,
})
export class UserDaneComponent implements OnInit {

    klucze: Subscription
    dlugosc_listy: number = 0;

  constructor(private page: Page, private dane: DaneService, private router: RouterExtensions, private ui: UiService) { }

  ngOnInit() {
      this.page.actionBarHidden = true;

      this.klucze = this.dane.Klucze.subscribe(klucze => {
        if(klucze !== null || klucze !== undefined)
        {
            this.dlugosc_listy = klucze.length
        }
      })
  }

  wyloguj()
  {
      this.router.navigate([""],{clearHistory: true, transition: { name: 'slideBottom', duration: 500}})
    setTimeout(() => {
        this.ui.pokazPowiadomienie('Sukces','Wylogowano pomyślnie',0,2)
    }, 300);
  }

}
