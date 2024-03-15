import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { ProductDetailsComponent } from './home/product-details/product-details.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component'
import { AppHttpInterceptor } from './http.interceptor';
import { WishlistComponent } from './home/wishlist/wishlist.component';
import { CartComponent } from './home/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ShowPaymentStatusComponent } from './home/show-payment-status/show-payment-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from './loader/loader.component';
import { OrdersComponent } from './home/orders/orders.component';
import { OrderListComponent } from './home/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './home/orders/order-details/order-details.component';
import { DataViewModule } from 'primeng/dataview';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProductListComponent,
    FilterPipe,
    ProductDetailsComponent,
    LandingPageComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
    PaymentDetailsComponent,
    ShowPaymentStatusComponent,
    LoaderComponent,
    OrdersComponent,
    OrderListComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    DataViewModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
