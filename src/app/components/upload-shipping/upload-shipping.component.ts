import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseInterface } from 'src/app/base-interface';
import { SharedService } from 'src/app/services/shared.service';
import { BaseModalTemplateComponent } from '../modal-template/base-modal-template.component';

@Component({
  selector: 'app-upload-shipping',
  templateUrl: './upload-shipping.component.html',
  styleUrls: ['./upload-shipping.component.scss'],
})
export class UploadShippingComponent implements OnInit, BaseInterface {
  @Input() data: any;
  validating: boolean = false;
  base!: BaseModalTemplateComponent;

  constructor(
    public modalRef: BsModalRef,
    public sharedService: SharedService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {}

  uploadFromAService() {
    this.sharedService.isSubmitting$.next(true);
    console.log(JSON.stringify(this.data));
    this.hide()
  }

  hide() {
    console.log('hiding')
this.sharedService.isSubmitting$.next(false);
this.bsModalRef.hide();
  }
}
