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

  it('Should show the placeholder when there is no value', () => {
    component.placeholder = 'Choose an option';
    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    const selectedOption = select.options[select.selectedIndex];

    expect(selectedOption.textContent?.trim()).toBe('Choose an option');
  });
});
