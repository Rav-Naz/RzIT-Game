import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-user-dane',
  templateUrl: './user-dane.component.html',
  styleUrls: ['./user-dane.component.css'],
  moduleId: module.id,
})
export class UserDaneComponent implements OnInit {

  constructor(private page: Page) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
  }

}
