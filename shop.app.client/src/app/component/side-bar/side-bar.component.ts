import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  helpSwitch: boolean = false;
  clickMenuEventKey: string = 'sideMenuClick';

  ngAfterViewInit() {
    window.addEventListener('sideBarMenuOpen', () => {
      this.changeSizeOfSideMenu();
    });
  }

  //only used on mobile
  changeSizeOfSideMenu() {
    this.helpSwitch = !this.helpSwitch;

    if (this.helpSwitch == true) {
      document
        .getElementById('side-bar-hover-menu')!
        .classList.add('sideBarMenu-opened');
      document
        .getElementById('side-bar-hover-menu')!
        .classList.remove('sideBarMenu-closed');
    }

    if (this.helpSwitch == false) {
      document
        .getElementById('side-bar-hover-menu')!
        .classList.add('sideBarMenu-closed');
      document
        .getElementById('side-bar-hover-menu')!
        .classList.remove('sideBarMenu-opened');
    }
  }
}
