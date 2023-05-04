import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Materialok
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ItemComponent } from './items/item/item.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { NewItemComponent } from './items/new-item/new-item.component';
import {MatSelectModule} from '@angular/material/select';
import { RegisterComponent } from './register/register.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UsersupdateComponent } from './users/usersupdate/usersupdate.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    MainComponent,
    ItemComponent,
    NewItemComponent,
    RegisterComponent,
    UserslistComponent,
    UsersupdateComponent
  ],
  imports: [   
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
                // Materialok
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
