import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BaseModalTemplateComponent } from './components/modal-template/base-modal-template.component';
import { UploadPickupComponent } from './components/upload-pickup/upload-pickup.component';
import { UploadShippingComponent } from './components/upload-shipping/upload-shipping.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'modal-template';
  modalRef?: BsModalRef;
  keys = ['actionNeeded', 'deviceModel'];
  constants = ['Action Needed', 'Device Model'];
  constructor(private modalService: BsModalService) {}

  openModal(title: string, type: string) {
    let componentToCreate = null;
    let keys: string[] = [];
    let goConstants: string[] = [];
    if (type === 'shipping') {
      componentToCreate = UploadShippingComponent;
      keys = this.keys;
      goConstants = this.constants;

    } else if (type === 'pickup') {
      componentToCreate = UploadPickupComponent;
      keys = this.keys;
      goConstants = this.constants
    }

    const config: ModalOptions = {
      initialState: {
        title: title,
        componentToCreate: componentToCreate,
        dtoKeys: keys,
        goConstants: goConstants,
      },
    };
    this.modalRef = this.modalService.show(BaseModalTemplateComponent, config);
    console.log("content", this.modalRef.content)
  }

  openShippingModal(title: string) {
    const config: ModalOptions = {
      initialState: {
        title: title,
      },
    };
    this.modalRef = this.modalService.show(UploadShippingComponent, config);
  }
}
