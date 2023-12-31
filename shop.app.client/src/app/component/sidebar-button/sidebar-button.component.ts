import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.css'
})
export class SidebarButtonComponent {
  @Input() buttonColor: string = "white";
  @Input() buttonIcon: string = "pi pi-question";
  @Input() buttonText: string = "PLACEHOLDER";

}
