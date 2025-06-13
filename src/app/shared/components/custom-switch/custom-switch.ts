import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-switch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-switch.html',
  styleUrl: './custom-switch.css',
  host: {
    tabindex: '0',
    role: 'switch',
    '[attr.aria-checked]': 'modelValue',
    '[attr.aria-disabled]': 'disabled',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '(keydown.space)': 'toggle()',
    '(keydown.enter)': 'toggle()',
    '(click)': 'toggle()'
  },
})
export class CustomSwitchComponent {
  @Input() disabled = false;
  @Input() modelValue = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;
  @Output() modelValueChange = new EventEmitter<boolean>();

  toggle() {
    if (!this.disabled) {
      this.modelValue = !this.modelValue;
      this.modelValueChange.emit(this.modelValue);
    }
  }

  onKeydown(event: KeyboardEvent) {
  if (this.disabled) {
    event.preventDefault();
    return;
  }

  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault();
    this.toggle();
  }
}
}
