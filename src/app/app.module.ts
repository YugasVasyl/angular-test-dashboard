import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './shared/user/user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserPopupComponent } from './shared/user-popup/user-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmPopupComponent } from './shared/confirm-popup/confirm-popup.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    UserComponent,
    UserPopupComponent,
    ConfirmPopupComponent,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
