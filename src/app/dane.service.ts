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

    nadajKlucz(klucz: Klucz)
     {
         this.wybranyKlucz = klucz;
     }

    wyczysc()
    {
        this.nadajKlucz({id: 0, rfid: '111111', tytul: '', zagadka: '',link: 'google.com', data_zebrania: null})
        this.klucze = [];
        this.kluczeSub.next(null)
        this.http.nadajAlbum(1)
    }


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

    async zmienHaslo(aktualne_haslo: string, nowe_haslo: string)
    {
        return new Promise<number>(resolve => {
            this.http.zmienHaslo(aktualne_haslo,nowe_haslo).then(res => {
                resolve(res)
            })
        })
    }


    get WybranyKlucz()
    {
        return this.wybranyKlucz
    }
}
