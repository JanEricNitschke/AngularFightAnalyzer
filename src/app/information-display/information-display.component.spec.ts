import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDisplayComponent } from './information-display.component';

describe('InformationDisplayComponent', () => {
  let component: InformationDisplayComponent;
  let fixture: ComponentFixture<InformationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
