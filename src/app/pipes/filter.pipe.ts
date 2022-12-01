import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultEmployees = [];
    for (const employee of value) {
      if (
        employee.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        employee.surname.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        resultEmployees.push(employee);
      }
    }
    return resultEmployees;
  }
}
