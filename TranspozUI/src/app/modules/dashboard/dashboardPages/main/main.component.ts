import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  showCard: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkRoute(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
      });
  }
  private checkRoute(url: string): void {
    this.showCard = url === '/dashboard' || url === '/';
  }
}
