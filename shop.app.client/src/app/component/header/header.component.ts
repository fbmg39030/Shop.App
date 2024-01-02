import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  items : MenuItem [] | undefined;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      // {
      //   label: "Home",
      //   icon: "pi pi-home",
      //   command: () => this.navigate("")
      // },
      // {
      //   label: "Cart",
      //   icon: "pi pi-shopping-bag",
      //   command: () => this.navigate("cart")
      // },
      // {
      //   label: "Data Management",
      //   icon: "pi pi-database",
      //   command: () => this.navigate("data-management")
      // }
    ]
  }

  navigate(route: string){
    this.router.navigate([route]);
  }
  
  
}
