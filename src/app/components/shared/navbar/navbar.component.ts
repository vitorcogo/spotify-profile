import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/constants/pages.const';
import { PagesEnum } from 'src/app/models/pages.enum';
import { NavbarService } from './navbar.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentPage!: PagesEnum;;
  pages = Pages;

  constructor(
    private navbarService: NavbarService,
    private router: Router
  ) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        const { url } = event;
        for (const page in PagesEnum) {
          const pageLowerCase = page.toLowerCase();
    
          if (url.endsWith(pageLowerCase)) {
            this.navbarService.setCurrentPage(pageLowerCase as PagesEnum);
            return;
          }
        }
        this.setStartPage();
      }
    });
  }

  ngOnInit(): void {
    this.getCurrentPage();
  }

  setCurrentPage(pageId: PagesEnum) {
    this.navbarService.setCurrentPage(pageId);
  }

  private getCurrentPage() {
    this.navbarService.getCurrentPage().subscribe((currentPage) => {
      this.currentPage = currentPage;
    })
  }

  private setStartPage(): void {
    this.navbarService.setCurrentPage(PagesEnum.PROFILE);
  }
}
