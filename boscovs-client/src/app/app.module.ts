import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatListModule, MatCardModule, MatTableModule, MatDialogModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WatchesComponent } from './products/watches/watches.component';
import {AuthService} from './shared/services/auth.service';
import { ProductsComponent } from './products/products.component';
import {ProductsService} from './shared/services/products.service';

// let config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('709146169588-cr3q9ncbsjf486l76pqgqgjqdheduv47.apps.googleusercontent.com')
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('571123523279490')
//   }
// ]);
//
// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WatchesComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [AuthService, ProductsService],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
