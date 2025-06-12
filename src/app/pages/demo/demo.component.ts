import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';
import { CustomSwitchComponent } from '../../shared/components/custom-switch/custom-switch';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [FormsModule, CustomSelectComponent, CustomSwitchComponent],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  selectedValue1 = '';
  selectedValue2 = '';
  selectOptions = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' }
  ];

  switchState1 = false;
  switchState2 = false;
  switchState3 = true;
}
