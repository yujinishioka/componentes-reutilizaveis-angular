import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';
import { CustomSwitchComponent } from '../../shared/components/custom-switch/custom-switch';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomSelectComponent, CustomSwitchComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  selectedValue1 = '';
  selectedValue2 = '';
  selectOptions = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript', disabled: true }
  ];

  switchState1 = false;
  switchState2 = false;
  switchState3 = true;

  bgColorSelect = '#eee';
  textColorSelect = '#000000B1';

  bgUncheckedCircleSwitch = '#fff';
  bgUncheckedTrackSwitch = '#ccc';
  bgCheckedCircleSwitch = '#343a92';
  bgCheckedTrackSwitch = '#757cdb';
}
