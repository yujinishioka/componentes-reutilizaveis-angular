import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() set options(value: { value: string; label: string; disabled?: boolean }[]) {
    this._options = value.map(opt => ({
      ...opt,
      disabled: opt.disabled ?? false
    }));
  }

  get options() {
    return this._options;
  }

  private _options: { value: string; label: string; disabled: boolean }[] = [];

  @Input() disabled = false;
  @Input() placeholder = 'Choose an option';

  @Output() valueChange = new EventEmitter<string>();

  value: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleChangeDirect(value: string) {
  this.value = value;
  this.onChange(value);
  this.valueChange.emit(value);
}
}
