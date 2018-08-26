import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListComponent } from './form-list/form-list.component';
import { ExportComponent } from './export/export.component';
import { PreviewComponent } from './preview/preview.component';
import { FormDataService } from './form-data.service';
const routes: Routes = [
  {
    path: '',
    component: FormListComponent
  },
  {
    path: 'export',
    component: ExportComponent
  },
  {
    path: 'preview',
    component: PreviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [FormDataService]
})
export class AppRoutingModule { }
