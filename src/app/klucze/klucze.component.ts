import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-klucze',
  templateUrl: './klucze.component.html',
  styleUrls: ['./klucze.component.css'],
  moduleId: module.id,
})
export class KluczeComponent implements OnInit {

  constructor(private page: Page) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
  }

}
