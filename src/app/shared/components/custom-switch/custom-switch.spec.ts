import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSwitchComponent } from './custom-switch';

describe('CustomSwitch', () => {
  let component: CustomSwitchComponent;
  let fixture: ComponentFixture<CustomSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must have a role "switch" and atributes of acessibility', () => {
    const el = fixture.nativeElement;
    expect(el.getAttribute('role')).toBe('switch');
    expect(el.getAttribute('aria-checked')).toBe('false');
    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('must alternate value on click', () => {
    spyOn(component.modelValueChange, 'emit');

    const el = fixture.nativeElement;
    el.click();
    fixture.detectChanges();

    expect(component.modelValue).toBeTrue();
    expect(component.modelValueChange.emit).toHaveBeenCalledWith(true);
  });

  it('must not activate if disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    spyOn(component.modelValueChange, 'emit');

    const el = fixture.nativeElement;
    el.click();
    fixture.detectChanges();

    expect(component.modelValue).toBeFalse();
    expect(component.modelValueChange.emit).not.toHaveBeenCalled();
  });

  it('change value with Enter', () => {
    spyOn(component.modelValueChange, 'emit');

    const el = fixture.debugElement;
    el.triggerEventHandler('keydown.enter', new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.modelValue).toBeTrue();
    expect(component.modelValueChange.emit).toHaveBeenCalledWith(true);
  });

  it('change value with Space', () => {
    spyOn(component.modelValueChange, 'emit');

    const el = fixture.debugElement;
    el.triggerEventHandler('keydown.space', new KeyboardEvent('keydown', { key: ' ' }));
    fixture.detectChanges();

    expect(component.modelValue).toBeTrue();
    expect(component.modelValueChange.emit).toHaveBeenCalledWith(true);
  });

  it('tabindex must be "-1" when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.getAttribute('tabindex')).toBe('-1');
  });
});
