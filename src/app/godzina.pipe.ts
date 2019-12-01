import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'godzina'
})
export class GodzinaPipe implements PipeTransform {

  transform(value: Date, ...args: any[]): any {
      let data = value.toJSON();
    return data.slice(0,10) + "\n" + data.slice(11,16);
  }

}
