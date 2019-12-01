import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { DaneService } from '../dane.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RouterExtensions } from 'nativescript-angular/router';
import { UiService } from '../ui.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'ns-user-dane',
  templateUrl: './user-dane.component.html',
  styleUrls: ['./user-dane.component.css'],
  moduleId: module.id,
})
export class UserDaneComponent implements OnInit {

    klucze: Subscription
    dlugosc_listy: number = 0;
    nr_albumu: number = 0;
    miejsce: number = 0;

  constructor(private page: Page, private dane: DaneService, private router: RouterExtensions,
    private ui: UiService, private http: HttpService) { }

  ngOnInit() {
      this.nr_albumu = this.http.NumerAlbumu

      this.page.actionBarHidden = true;

      this.klucze = this.dane.Klucze.subscribe(klucze => {
          if(klucze !== null && klucze !== undefined)
          {
              this.dlugosc_listy = klucze.length
              this.dane.ranking().then(res => {
                  this.miejsce = res
              })
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
