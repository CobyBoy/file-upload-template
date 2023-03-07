import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPickupComponent } from './upload-pickup.component';

describe('UploadPickupComponent', () => {
  let component: UploadPickupComponent;
  let fixture: ComponentFixture<UploadPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPickupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
