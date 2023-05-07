import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
  },
  {
    path: 'test-component',
    component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
