import { MapsComponent } from './maps/maps.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'people' },
  { path: 'people', component: PeopleComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'maps', component: MapsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
