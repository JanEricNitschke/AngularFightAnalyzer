import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationService } from '../information.service';
import { InformationDisplayComponent } from './information-display.component';

describe('InformationDisplayComponent', () => {
  let component: InformationDisplayComponent;
  let fixture: ComponentFixture<InformationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationDisplayComponent],
      providers: [InformationService],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'getInformationContent');
    component.ngOnInit();
    expect(component.getInformationContent).toHaveBeenCalled();
  });

  it('should getInformationContent', () => {
    expect(component.InformationContent).not.toBeTruthy();
    component.Type = 'Kill';
    component.getInformationContent();
    expect(component.InformationContent).toBeTruthy();
    expect(component.InformationContent).toBe(
      'Select whether you want to filter directly by weapons or generally by classes for the killing weapon.<br> The kill must have been made by a weapon matching at least one of the chosen classes weapons.<br>\
     If nothing is specified then every weapon passes.',
    );
  });
});
