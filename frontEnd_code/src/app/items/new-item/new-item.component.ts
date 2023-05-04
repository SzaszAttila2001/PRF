import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getPeriodicElementForm } from '../../shared/forms/periodic-element.form';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../utils/connection.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent {
  id!: string | null;
  form: FormGroup = getPeriodicElementForm();

  constructor(private route: ActivatedRoute, private service:ConnectionService, private router:Router){}


  async save(data: any) {
    this.service.saveItem(data).subscribe((result: any) => {
      console.log('A termek feltoltese sikeres!')
      this.router.navigate(['/main']);
    }, error => {
      console.log(error);
    });
    
  }

}
