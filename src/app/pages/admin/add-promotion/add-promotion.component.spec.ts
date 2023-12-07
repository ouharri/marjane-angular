import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromontionComponent } from './add-promotion.component';

describe('AddPromontionComponent', () => {
  let component: AddPromontionComponent;
  let fixture: ComponentFixture<AddPromontionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPromontionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPromontionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
