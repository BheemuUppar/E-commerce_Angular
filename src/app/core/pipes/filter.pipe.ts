import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[], keyword: string): any {
    if (keyword == 'All') {
      return data;
    }

    return  data.filter((obj) => {
      return obj.category == keyword;
    });
  }
}
