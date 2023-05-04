import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserElement } from 'src/app/shared/models/user-elemet.model';
import { ConnectionService } from 'src/app/utils/connection.service';
import { LoginService } from 'src/app/utils/login.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent {
  displayedColumns: string[] = ['username', 'email', 'accessLevel'];
  data: UserElement[] = [];
  dataSource!: MatTableDataSource<UserElement>;

  constructor(private connection: ConnectionService, private loginService: LoginService, private router: Router){}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.getData();
  }

  getData(){
    this.connection.getUsers().subscribe((result:any) => {
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
