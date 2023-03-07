import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShippingComponent } from './upload-shipping.component';

describe('UploadShippingComponent', () => {
  let component: UploadShippingComponent;
  let fixture: ComponentFixture<UploadShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
