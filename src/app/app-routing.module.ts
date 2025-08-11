import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'cd-demo',
    loadComponent: () =>
      import('./features/change-detection/change-detection.component').then(
        (m) => m.ChangeDetection,
      ),
  },
  {
    path: 'forms/template',
    loadComponent: () =>
      import('./features/forms/template-form/template-form.component').then(
        (m) => m.TemplateFormComponent,
      ),
  },
  {
    path: 'forms/reactive',
    loadComponent: () =>
      import('./features/forms/reactive-form/reactive-form.component').then(
        (m) => m.ReactiveFormComponent,
      ),
  },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
