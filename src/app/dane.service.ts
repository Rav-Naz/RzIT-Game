import { Injectable } from '@angular/core';
import { Klucz } from './modele/klucz.model';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DaneService {

    constructor(private http: HttpService){}

    private wybranyKlucz: Klucz;

    private dlugoscListy: number = 0;


    private klucze: Array<Klucz> = []

    private kluczeSub = new BehaviorSubject<Array<Klucz>>(null);


    get Klucze()
    {
        return this.kluczeSub.asObservable()
    }

    get DlugoscCalejListy()
    {
        return this.dlugoscListy
    }

    async pobierzKlucze()
    {
        return new Promise<number>(resolve => {
            this.http.pobierzKlucze().then(res => {
                this.klucze = res
                this.kluczeSub.next(this.klucze)
                resolve(1)
            })
        })
    }

    async zbierzKlucz(RFID: string)
    {
        return new Promise<number>(resolve => {
            this.http.zbierzKlucz(RFID).then(res => {
                if(res === 1)
                {
                    this.pobierzKlucze().then(() => {
                        resolve(1)
                    })
                }
                else
                {
                    resolve(res);
                }
            })

        })
    }

    async dlugoscListyKluczy()
    {
        return new Promise<number>(resolve => {
            this.http.dlugoscListyKluczy().then(res => {
                this.dlugoscListy = res
                resolve(res)
            })
        })

    }

    async ranking()
    {
        return new Promise<number>(resolve => {
            this.http.ranking().then( res => {
                resolve(res)
            })
        })
    }

   nadajKlucz(klucz: Klucz)
    {
        this.wybranyKlucz = klucz;
    }

    get WybranyKlucz()
    {
        return this.wybranyKlucz
    }
}
