import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [FormsModule, CustomSelectComponent],
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
}
