import {
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  Signal,
} from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { AlbumsService, PhotoMetadata } from '../services/albums.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { AppModule } from '../app.module';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  standalone: true,
  imports: [AppModule],
})
export class AlbumComponent implements OnInit, OnDestroy {
  url: Signal<UrlSegment[] | undefined>;

  constructor(
    private route: ActivatedRoute,
    public albumsService: AlbumsService
  ) {
    this.url = toSignal(this.route.url);
  }

  ngOnInit() {
    const url = this.url();
    if (url) {
      this.albumsService.activeAlbum$.next(url[1].path);
    }
  }

  ngOnDestroy(): void {
    this.albumsService.activeAlbum$.next(undefined);
  }
}
