import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getPeriodicElementFormUser } from 'src/app/shared/forms/user-elemet.form';
import { ConnectionService } from 'src/app/utils/connection.service';

@Component({
  selector: 'app-usersupdate',
  templateUrl: './usersupdate.component.html',
  styleUrls: ['./usersupdate.component.css']
})
export class UsersupdateComponent {
  id!: string | null;
  form: FormGroup = getPeriodicElementFormUser();

  constructor(private route: ActivatedRoute, private service:ConnectionService, private router:Router){}


  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getUserByID(this.id as string).subscribe((result: any) => {
      this.form.patchValue(result);
    }, error => {
      console.log(error);
    });
  }

  async save(data: Object) {
    this.service.updateUser(data).subscribe((result: any) => {
      console.log('A frissites sikeres!')
      this.router.navigate(['/users']);
    }, error => {
      console.log(error);
    });
    
  }

  async delete(){
    this.service.deleteUserByID(this.id as string).subscribe((result:any) => {
      console.log('A felhasznalo torlese sikeres!')
      this.router.navigate(['/users']);
    }, error => {
      console.log(error);
    })
  }
}
