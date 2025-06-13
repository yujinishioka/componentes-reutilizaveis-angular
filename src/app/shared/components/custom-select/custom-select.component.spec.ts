import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomSelectComponent } from './custom-select.component';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;
  let el: DebugElement;

  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.options = mockOptions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open dropdown on click', () => {
    const dropdown = el.nativeElement.querySelector('.dropdown');
    dropdown.click();
    fixture.detectChanges();

    expect(component.dropdownOpen).toBeTrue();

    const list = el.nativeElement.querySelector('.dropdown-options');
    expect(list).toBeTruthy();
  });

  it('select an option on click', () => {
    component.toggleDropdown();
    fixture.detectChanges();

    const items = el.nativeElement.querySelectorAll('li');
    items[1].click();

    fixture.detectChanges();

    expect(component.value).toBe('1');
    const span = el.nativeElement.querySelector('.dropdown-selected span');
    expect(span.textContent.trim()).toBe('Option 1');
  });

  it('emit value on select an option', () => {
    spyOn(component.valueChange, 'emit');

    component.toggleDropdown();
    fixture.detectChanges();

    const items = el.nativeElement.querySelectorAll('li');
    items[2].click();
    fixture.detectChanges();

    expect(component.valueChange.emit).toHaveBeenCalledWith('2');
  });

  it('do not permit an disabled option to be selected', () => {
    const disabledOption = { value: 'x', label: 'Disabled', disabled: true };
    component.options = [...mockOptions, disabledOption];
    fixture.detectChanges();

    component.toggleDropdown();
    fixture.detectChanges();

    const items = el.nativeElement.querySelectorAll('li');
    const lastItem = items[items.length - 1];
    lastItem.click();
    fixture.detectChanges();

    expect(component.value).not.toBe('x');
  });
});
