import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ComponentRef,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { DynamicHostDirective } from 'src/app/dynamic-host.directive';
import { SharedService } from 'src/app/services/shared.service';
import { FileUploaderService } from 'src/app/services/file-uploader.service';

@Component({
  selector: 'app-base-modal-template',
  templateUrl: './base-modal-template.component.html',
  styleUrls: ['./modal-template.component.scss'],
})
export class BaseModalTemplateComponent implements OnInit {
  @Input() title!: string;
  @Input() componentToCreate!: any;
  @Input() dtoKeys!: [];
  @Input() goConstants!: string[];
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;

  fileTypes: string[] = ['.xlsx'];
  missingColumnErrors: string[] = [];
  extraColumnErrors: string[] = [];
  fileName: string = '';
  arrayBuffer: string | ArrayBuffer | ArrayBufferLike | null = '';
  initialInformation: any = [];
  data: any;
  fromFather = 'una prop from father';
  componentToRenderRef!: ComponentRef<any>;

  constructor(
    public modalRef: BsModalRef,
    public sharedService: SharedService,
    public fileUploaderService: FileUploaderService
  ) {}

  ngOnInit(): void {
    this.createComponent();
  }

  createComponent() {
    this.dynamicHost.viewContainerRef.clear();
    this.componentToRenderRef =
      this.dynamicHost.viewContainerRef.createComponent(this.componentToCreate);
    Object.assign(this.componentToRenderRef.instance, this.componentToCreate);
  }

  cleanFileSelected(fileInput: HTMLInputElement) {
    this.missingColumnErrors = [];
    this.extraColumnErrors = [];
    fileInput.value = '';
    this.sharedService.validating$.next(false);
    this.sharedService.isValid$.next(false);
    this.fileName = '';
  }

  generateJSon(event: Event) {
    this.sharedService.validating$.next(true);
    const file = (event.target as HTMLInputElement).files![0];
    this.fileName = file.name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer as any);
      const arr = [];
      for (let i = 0; i < data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const binaryString = arr.join('');
      const workbook = XLSX.read(binaryString, {
        type: 'binary',
        cellText: false,
        cellDates: true,
      });

      this.initialInformation = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
        {
          raw: false,
          defval: null,
          dateNF: 'mm/dd/yyyy',
        }
      );
      this.processExcel();
    };
  }

  processExcel() {
    if (
      !this.fileUploaderService.isValidExtension(
        this.fileName,
        this.fileTypes
      ) ||
      !this.areValidRequiredColumns()
    ) {
      this.sharedService.validating$.next(false);
      alert('failed processing');
      return;
    }
    this.data = Object.keys(this.initialInformation).map((objIndex) => {
      const asset = this.initialInformation[objIndex];
      return this.dtoKeys.reduce((acc, key, index) => {
        console.warn({ ...acc, [key]: asset[this.goConstants[index]] });
        return { ...acc, [key]: asset[this.goConstants[index]] };
      }, {});
      
    });
    console.log(this.data);
    this.componentToRenderRef.setInput('data', this.data);
    
    this.sharedService.validating$.next(false);
    this.sharedService.isValid$.next(true);
  }


  extraColumnsErrorMessage() {
    return `${
      this.extraColumnErrors.length > 1
        ? 'These columns from the file are'
        : 'this colum is'
    } not defined in the program: ${this.extraColumnErrors.join(', ')}`;
  }

  areValidRequiredColumns() {
    console.log(this.initialInformation);
    if (this.initialInformation.length > 0) {
      const excelColumns = Object.keys(this.initialInformation[0]).filter((x) => !x.includes('_EMPTY'));
      const requiredColumns = this.goConstants;
      const extraColumnNames = excelColumns.filter((x) => !requiredColumns.includes(x));

      requiredColumns.forEach((excelColum) => {
        if (!this.initialInformation[0].hasOwnProperty(excelColum)) {
          this.missingColumnErrors.push(excelColum);
          this.componentToRenderRef.setInput('missingColumnErrors',this.missingColumnErrors);
        }

        /* extraColumnNames.forEach(excelColum => { 
          this.extraColumnErrors.push(excelColum);
          this.componentToRenderRef.setInput('extraColumnErrors',this.extraColumnErrors);
        }) */
      });
    }

    return (
      [...this.missingColumnErrors, ...this.extraColumnErrors].length === 0
    );
  }

  hide() {
    this.modalRef?.hide();
  }
}
