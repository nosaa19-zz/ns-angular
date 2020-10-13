import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/api.response';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<ApiResponse>;
  table: any;

  constructor(private employeeService: EmployeeService,
    private router: Router) {
      setTimeout(function(){
        $(function(){
           $('#example').DataTable();
      });
      },2000);
    }

  ngOnInit() {
    this.loadAll();
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          this.employees = this.employeeService.getEmployees();
        },
        error => console.log(error));
  }

  updateEmployee(id: string){
    this.router.navigate(['update', id]);
  }

  private onSuccess(data) {
    console.log(data);
    this.employees = data;
  }

  loadAll() {
    this.rerender();
    this.employees = this.employeeService.getEmployees().pipe();
  }

  rerender(){
    setTimeout(function(){
      $(function(){
        var table = $('#example').DataTable();
        table.destroy();
        table.init();

    });
    },2000);
  }

}
