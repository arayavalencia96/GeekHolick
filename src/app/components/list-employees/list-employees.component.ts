import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees:any[]=[];
  constructor(private _employeeServices: EmployeeService,
              private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this._employeeServices.getEmployees().subscribe(data=>{
      this.employees = [];
      data.forEach((element:any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteEmployee(id:string){
    this._employeeServices.deleteEmployee(id).then(()=>{
      this.toastr.error('El empleado fue eliminado con éxito','Registro eliminado');
    }).catch(error=>{
      console.log('error');
    });
  }

}
