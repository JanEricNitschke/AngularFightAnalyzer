import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightSelectorComponent } from './fight-selector.component';

describe('FightSelectorComponent', () => {
  let component: FightSelectorComponent;
  let fixture: ComponentFixture<FightSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
