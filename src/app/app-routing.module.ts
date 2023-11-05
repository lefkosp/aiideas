import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { IdeaComponent } from './components/idea/idea.component';
import { IdeaGuard } from './guards/idea-guard.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  {
    path: 'idea',
    component: IdeaComponent,
  },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
