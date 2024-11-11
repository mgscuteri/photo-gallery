import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlbumsService } from './services/albums.service';
import { GlobalContainerComponent } from './global-container/global-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalContainerComponent],
  providers: [AlbumsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'photo-lib';

  constructor(
    private albumsService: AlbumsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    window.addEventListener('popstate', (event) => {
      if (document.location.toString().includes('static')) {
        window.location.href = '/static/';
      }
    });
  }
}
