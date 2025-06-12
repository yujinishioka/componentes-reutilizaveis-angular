import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-switch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-switch.html',
  styleUrl: './custom-switch.css'
})
export class CustomSwitchComponent {
  @Input() disabled = false;
  @Input() modelValue = false;
  @Output() modelValueChange = new EventEmitter<boolean>();

  toggle() {
    if (!this.disabled) {
      this.modelValue = !this.modelValue;
      this.modelValueChange.emit(this.modelValue);
    }
  }
}
