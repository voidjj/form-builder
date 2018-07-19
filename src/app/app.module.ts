import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsComponent } from './forms/forms.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormDataService } from './form-data.service';
import { FormViewComponent } from './form-view/form-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AppComponent,
     FormsComponent,
    SidebarComponent,
       FormViewComponent],
  providers: [FormDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
