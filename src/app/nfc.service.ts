import { Injectable } from '@angular/core';
import { Nfc, NfcNdefData } from 'nativescript-nfc';

@Injectable({
  providedIn: 'root'
})
export class NfcService {

    nfc: Nfc
    skanowac: boolean = false;

  constructor() {
    this.nfc = new Nfc;
  }

  async nasluchuj()
  {
    return new Promise<string>((resolve) => {
        let scan = ""
        this.nfc.enabled().then((on) => {
            if (on) {
                this.nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
                    let dane = JSON.parse(JSON.stringify(data))
                    scan = dane.message[0].payloadAsString.toString()
                    this.wylaczNasluch()
                    resolve(scan)
                })
            }
            else
            {
                resolve('nfc')
            }
        })
    })
  }

  wylaczNasluch()
  {
      this.nfc.setOnNdefDiscoveredListener(null)
  }
}
