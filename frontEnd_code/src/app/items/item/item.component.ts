import { Component } from '@angular/core';
import { ConnectionService } from '../../utils/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { getPeriodicElementForm } from '../../shared/forms/periodic-element.form';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  id!: string | null;
  form: FormGroup = getPeriodicElementForm();

  constructor(private route: ActivatedRoute, private service:ConnectionService, private router:Router){}


  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getItemByID(this.id as string).subscribe((result: any) => {
      this.form.patchValue(result);
    }, error => {
      console.log(error);
    });
  }

  async save(data: Object) {
    this.service.updateItem(data).subscribe((result: any) => {
      console.log('A frissites sikeres!')
      this.router.navigate(['/main']);
    }, error => {
      console.log(error);
    });
    
  }

  async delete(){
    this.service.deleteItemByID(this.id as string).subscribe((result:any) => {
      console.log('A termek torlese sikeres!')
      this.router.navigate(['/main']);
    }, error => {
      console.log(error);
    })
  }

}
