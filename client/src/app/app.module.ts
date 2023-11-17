import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultErrorStateMatcher } from './default-error-state.matcher';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { ErrorStateMatcher } from '@angular/material/core';

import { MaterialModule } from './modules/material.module';
import { ComponentModule } from './modules/component.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,

    MaterialModule,
    ComponentModule
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: DefaultErrorStateMatcher }],
  bootstrap: [AppComponent]
})
export class AppModule { }