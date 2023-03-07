import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-upload-pickup',
  templateUrl: './upload-pickup.component.html',
  styleUrls: ['./upload-pickup.component.scss'],
})
export class UploadPickupComponent implements OnInit {
  @Input() data: any;
  @Input() missingColumnErrors: [] = [];
  @Input() extraColumnErrors: [] = []; // if needed to be implemented
  constructor(
    public sharedService: SharedService,
    private bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {}

  uploadFromAService() {
    this.sharedService.isSubmitting$.next(true);
    alert(JSON.stringify(this.data));
    this.sharedService.isSubmitting$.next(false);
    this.bsModalRef.hide();
  }
  missingColumnsErrorMessage() {
    return `${
      this.missingColumnErrors.length > 1
        ? 'These columns are'
        : 'this colum is'
    } missing in the file: ${this.missingColumnErrors.join(', ')}`;
  }
}
