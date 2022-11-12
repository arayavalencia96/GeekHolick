import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  createEmployee: FormGroup;
  submitted = false;
  loading = false;
  id : string | null;
  titulo= 'Agregar Empleado';
  constructor(private fb: FormBuilder,
              private _employeeService: EmployeeService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createEmployee=this.fb.group({
      name: ['',Validators.required],
      surname: ['',Validators.required],
      sector: ['',Validators.required],
      salary: ['',Validators.required],
      doc: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.isEdit();
  }

  addOrEditEmployee(){
    this.submitted = true;
    if(this.createEmployee.invalid){
      return;
    }
    if(this.id === null){
      this.addEmployee();
    }else{
      this.editEmployee(this.id);
    }
  }

  addEmployee(){
    const employee:any = {
      name:this.createEmployee.value.name,
      surname:this.createEmployee.value.surname,
      doc:this.createEmployee.value.doc,
      sector:this.createEmployee.value.sector,
      salary:this.createEmployee.value.salary,
      dateCreation: new Date(),
      dateActualitation: new Date()
    }
    this.loading=true;
    this._employeeService.addEmployee(employee).then(() =>{
      this.toastr.success('Creado con éxito!', 'Creación de empleado');
      this.loading=false;
      this.router.navigate(['/list-employees']);
    }).catch(error =>{
      console.log(error);
      this.loading=false;
    })
  }

  editEmployee(id:string){
    const employee:any = {
      name:this.createEmployee.value.name,
      surname:this.createEmployee.value.surname,
      doc:this.createEmployee.value.doc,
      sector:this.createEmployee.value.sector,
      salary:this.createEmployee.value.salary,
      dateActualitation: new Date()
    }
    this.loading=true;
    this._employeeService.ActEmployee(id, employee).then(()=>{
      this.loading=false;
      this.toastr.info('El empleado fue modificado con éxito','Empleado modificado');
      this.router.navigate(['/list-employees']);
    });
  }

  isEdit(){
    if(this.id !== null){
      this.loading = true;
      this._employeeService.getEmployee(this.id).subscribe(data=>{
        this.loading = false;
        console.log(data.payload.data()['name']);
        this.createEmployee.setValue({
          name:data.payload.data()['name'],
          surname:data.payload.data()['surname'],
          doc:data.payload.data()['doc'],
          sector:data.payload.data()['sector'],
          salary:data.payload.data()['salary'],
        })
      });
    }
  }

}
