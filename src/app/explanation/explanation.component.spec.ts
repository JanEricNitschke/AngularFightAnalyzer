import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ExplanationComponent } from './explanation.component';


const router = {
  navigate: jasmine.createSpy('navigate')
}

describe('ExplanationComponent', () => {
  let component: ExplanationComponent;
  let fixture: ComponentFixture<ExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplanationComponent],
      providers: [{ provide: Router, useValue: router }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExplanationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    expect(component.example_map).toEqual(new Map<string, string[]>())
    fixture.detectChanges();
    component.selectedExample = "d2mid"
    expect(component.example_map.get(component.selectedExample)![0].endsWith("dust2_mid_full.png")).toBe(true)
    component.selectedExample = "infmid"
    expect(component.example_map.get(component.selectedExample)![0].startsWith("../../assets/examples/")).toBe(true)
  });

  it('go to selector', () => {
    component.GoToSelector()
    expect(router.navigate).toHaveBeenCalledWith(["selector"])
  });
});
