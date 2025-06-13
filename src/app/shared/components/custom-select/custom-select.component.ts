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
    const placeholderOption = {
      value: '',
      label: this.placeholder,
      disabled: true
    };

    this._options = [placeholderOption, ...value.map(opt => ({
      ...opt,
      disabled: opt.disabled ?? false
    }))];
  }

  get options() {
    return this._options;
  }

  private _options: { value: string; label: string; disabled: boolean }[] = [];

  @Input() disabled = false;
  @Input() placeholder = 'Choose an option';

  @Output() valueChange = new EventEmitter<string>();

  value: string = '';
  dropdownOpen = false;
  focusedIndex = 0;

  get selectedLabel(): string {
    const selected = this.options.find(opt => opt.value === this.value);
    return selected ? selected.label : '';
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    const selectedOption = this.options.find(opt => opt.value === value && !opt.disabled);
    this.value = selectedOption ? selectedOption.value : '';
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

  findFirstEnabledOption(): number {
    return this.options.findIndex(opt => !opt.disabled);
  }

  toggleDropdown() {
    if (this.disabled) return;

    this.dropdownOpen = !this.dropdownOpen;

    if (this.dropdownOpen) {
      const index = this.options.findIndex(opt => opt.value === this.value && !opt.disabled);
      this.focusedIndex = index >= 0 ? index : this.findFirstEnabledOption();
      setTimeout(() => this.scrollIntoView(), 0);
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  selectOption(value: string) {
    this.value = value;
    this.dropdownOpen = false;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  scrollIntoView() {
    const optionElement = document.getElementById(`option-${this.focusedIndex}`);
    optionElement?.scrollIntoView({ block: 'nearest' });
  }

  moveFocus(direction: 1 | -1) {
    let nextIndex = this.focusedIndex;
    const len = this.options.length;

    for (let i = 0; i < len; i++) {
      nextIndex = (nextIndex + direction + len) % len;
      if (!this.options[nextIndex].disabled) break;
    }

    this.focusedIndex = nextIndex;
    this.scrollIntoView();
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.dropdownOpen) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggleDropdown();
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveFocus(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveFocus(-1);
    } else if (event.key === 'Enter' || event.key === 'Tab') {
      const option = this.options[this.focusedIndex];
      if (!option.disabled) {
        this.selectOption(option.value);
      } else {
        event.preventDefault();
        this.moveFocus(1);
      }
    } else if (event.key === 'Escape') {
      this.dropdownOpen = false;
    }
  }

  onBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    const isInside = relatedTarget?.closest('.dropdown');
    if (!isInside) {
      this.closeDropdown();
    }
  }
}
