import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { WishlistComponent } from './home/wishlist/wishlist.component';
import { CartComponent } from './home/cart/cart.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { OrdersComponent } from './home/orders/orders.component';
import { OrderListComponent } from './home/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './home/orders/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    // canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: LandingPageComponent },
      { path: 'details', component: ProductDetailsComponent },
      {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [authGuard],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard],
        children:[
        {
          path:"details", component:OrderDetailsComponent
        }
      ]
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard],
      },
      { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
