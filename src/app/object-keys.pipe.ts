import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class ObjectKeysPipe implements PipeTransform {
  transform(value: any): string[] {
    if (!value) return [];
    return Object.keys(value);
  }
}