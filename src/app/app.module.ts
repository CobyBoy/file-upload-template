import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { BaseModalTemplateComponent } from './components/modal-template/base-modal-template.component';
import { UploadShippingComponent } from './components/upload-shipping/upload-shipping.component';
import { DynamicHostDirective } from './dynamic-host.directive';
import { UploadPickupComponent } from './components/upload-pickup/upload-pickup.component';

@NgModule({
  declarations: [AppComponent, BaseModalTemplateComponent, UploadShippingComponent, DynamicHostDirective, UploadPickupComponent],
  imports: [BrowserModule, TooltipModule.forRoot(), ModalModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
