import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsWeaponsService } from '../maps-weapons.service';
import { ButtonListComponent } from './button-list.component';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';;
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('ButtonListComponent', () => {
  let component: ButtonListComponent;
  let fixture: ComponentFixture<ButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, ReactiveFormsModule, FormsModule,],
      declarations: [ButtonListComponent],
      providers: [MapsWeaponsService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonListComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

  });
  it('should init', () => {
    expect(component.initialized).toBe(false)
    component.ngOnInit()
    expect(component.initialized).toBe(true)
  });

  it('should grab content', () => {
    expect(component.ContentType).toBe("")
    expect(component.Name).toBe("")
    expect(component.ContentNotSelected).toEqual([])
    component.ContentType = "Classes"
    component.Name = "Allowed"
    component.getContent()
    expect(component.ContentType).toBe("Classes")
    expect(component.Name).toBe("Allowed")
    expect(component.ContentNotSelected.length).toBeGreaterThan(0)
  });

  it('should set settings', () => {
    expect(component.ContentNotSelected).toEqual([])
    expect(component.ContentSelected).toEqual([])
    component.ContentType = "Classes"
    component.Name = "Allowed"
    component.ContentNotSelected = ["Pistols", "Heavy", "Grenade", "Equipment"]
    component.ContentSelected = ["SMG", "Rifle"]
    component.setSettings(["Rifle", "Grenade"])
    expect(component.ContentNotSelected).toEqual(["Pistols", "Heavy", "SMG", "Equipment"])
    expect(component.ContentSelected).toEqual(["Rifle", "Grenade"])
  });

  it('should reset', () => {
    expect(component.ContentNotSelected).toEqual([])
    expect(component.ContentSelected).toEqual([])
    component.ContentType = "Classes"
    component.Name = "Allowed"
    component.ContentNotSelected = ["Pistols", "Heavy", "Grenade", "Equipment"]
    component.ContentSelected = ["SMG", "Rifle"]
    expect(component.ContentNotSelected).toEqual(["Pistols", "Heavy", "Grenade", "Equipment"])
    expect(component.ContentSelected).toEqual(["SMG", "Rifle"])
    component.reset()
    expect(component.ContentNotSelected).toEqual(["Pistols", "Heavy", "SMG", "Rifle", "Grenade", "Equipment"])
    expect(component.ContentSelected).toEqual([])
  });

  it('should add element', () => {
    spyOn(component, "submitContent")
    component.ContentType = "Classes"
    component.Name = "Allowed"
    component.ContentNotSelected = ["Pistols", "Heavy", "Grenade", "Equipment"]
    component.ContentSelected = ["SMG", "Rifle"]
    expect(component.ContentNotSelected).toEqual(["Pistols", "Heavy", "Grenade", "Equipment"])
    expect(component.ContentSelected).toEqual(["SMG", "Rifle"])
    component.addElement("Pistols")
    expect(component.submitContent).toHaveBeenCalledWith(["SMG", "Rifle", "Pistols"])
    expect(component.contentCtrl.value).toBe("")
    expect(component.ContentSelected).toEqual(["SMG", "Rifle", "Pistols"])
    expect(component.ContentNotSelected).toEqual(["Heavy", "Grenade", "Equipment"])

  });

  it('should remove element', () => {
    spyOn(component, "submitContent")
    component.ContentType = "Classes"
    component.Name = "Allowed"
    component.ContentNotSelected = ["Pistols", "Heavy", "Grenade", "Equipment"]
    component.ContentSelected = ["SMG", "Rifle"]
    expect(component.ContentNotSelected).toEqual(["Pistols", "Heavy", "Grenade", "Equipment"])
    expect(component.ContentSelected).toEqual(["SMG", "Rifle"])
    component.removeElement("Rifle")
    expect(component.submitContent).toHaveBeenCalledWith(["SMG"])
    expect(component.contentCtrl.value).toBe("")
    expect(component.ContentSelected).toEqual(["SMG"])
    expect(component.ContentNotSelected).toEqual(["Pistols", "Heavy", "Grenade", "Equipment", "Rifle"])
  });

  it('should submit content', () => {
    spyOn(component.contentEvent, "emit")
    component.submitContent(["Test"])
    expect(component.contentEvent.emit).toHaveBeenCalledWith(["Test"])
  });

  it('should filter content', () => {
    component.ContentNotSelected = ["AA", "AB", "AC", "BA", "BB", "BC"]
    expect(component["_filterContent"]("A")).toEqual(["AA", "AB", "AC"])
    expect(component["_filterContent"]("BC")).toEqual(["BC"])
  });



});
