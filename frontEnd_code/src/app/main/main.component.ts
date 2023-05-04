import { Component } from '@angular/core';
import { PeriodicElement } from '../shared/models/periodic-element.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionService } from '../utils/connection.service';
import { LoginService } from '../utils/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  displayedColumns: string[] = ['name', 'price', 'description', 'owner_name'];
  data: PeriodicElement[] = [];
  dataSource!: MatTableDataSource<PeriodicElement>;
  isAdmin = localStorage.getItem('isAdmin') == "true";
  
  constructor(private connection: ConnectionService, private loginService: LoginService, private router: Router){}


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.getData();
  }

  getData(){
    this.connection.getItems().subscribe((result:any) => {
      this.dataSource.data = result;
    }, error => {
      console.log(error);
    });
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');

    this.router.navigate(['/login']);

    this.loginService.logout().subscribe(msg =>{
      console.log(msg);
    }, error => {
      console.log('Hiba tortent: ', error);
    });
  }


}
