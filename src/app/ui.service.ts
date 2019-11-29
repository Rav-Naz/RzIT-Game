import { Injectable } from '@angular/core';
import { Page, isIOS, Color } from 'tns-core-modules/ui/page/page';
import { Feedback, FeedbackType } from "nativescript-feedback";

@Injectable({
  providedIn: 'root'
})
export class UiService {

    private feedback: Feedback;

  constructor() {
    this.feedback = new Feedback();
  }

  pokazPowiadomienie(naglowek: string, tresc: string, typ: number, dlugosc: number)
  {
    this.feedback.show({
        title: naglowek,
        message: tresc,
        titleFont: isIOS ? "Acme" : "Acme-Regular.ttf",
        messageFont: isIOS ? 'Comfortaa' : "Comfortaa-Regular.ttf",
        duration: dlugosc*1000,
        backgroundColor: typ === 0? new Color(255,49, 155, 49): typ === 1? new Color("#e71e25"):new Color(255, 255, 207, 51),
        type: typ
    });
  }
}
