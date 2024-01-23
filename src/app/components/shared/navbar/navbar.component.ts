import { Component } from '@angular/core';
import { Pages } from 'src/app/constants/pages.const';
import { PagesEnum } from 'src/app/models/pages.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  pages = Pages;

  setCurrentPage(pageId: PagesEnum) {
    this.pages.forEach(page => {
      page.isActive = page.id === pageId;
    });
  }
}
