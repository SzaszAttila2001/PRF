import { Component } from '@angular/core';
import { LoginService } from '../utils/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router){
    this.password = "";
    this.username = "";
  }

  login(){
    if (this.username != "" && this.password != ""){
      this.loginService.login(this.username, this.password).subscribe((msg: any) =>{
        localStorage.setItem('user', this.username);
        localStorage.setItem('isAdmin', (msg.accessLevel == 3) as unknown as string)
        this.router.navigate(['/main']);
      }, error => {
        console.log('Hiba tortent: ', error);
      });
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.logout().subscribe(msg =>{
      }, error => {
        console.log('Hiba tortent: ', error);
      });
    }
  }
}
