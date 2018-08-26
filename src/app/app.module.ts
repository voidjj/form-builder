import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormListComponent } from './form-list/form-list.component';
import { ExportComponent } from './export/export.component';
import { PreviewComponent } from './preview/preview.component';
import { FormDataService } from './form-data.service';
import { FormItemComponent } from './form-item/form-item.component';
import { PreviewItemComponent } from './preview-item/preview-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    FormListComponent,
    FormItemComponent,
    PreviewItemComponent,
    ExportComponent,
    PreviewComponent],
  providers: [FormDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
