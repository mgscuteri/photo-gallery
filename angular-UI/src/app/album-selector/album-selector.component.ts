import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { ImageComponent } from '../image/image.component';
import { AlbumComponent } from '../album/album.component';
import { Router } from '@angular/router';
import { GlobalContainerComponent } from '../global-container/global-container.component';

@Component({
  selector: 'app-album-selector',
  standalone: true,
  imports: [ImageComponent],
  providers: [AlbumsService, GlobalContainerComponent],
  templateUrl: './album-selector.component.html',
  styleUrl: './album-selector.component.scss',
})
export class AlbumSelectorComponent implements OnInit {
  constructor(public albumsService: AlbumsService, private router: Router) {}

  ngOnInit(): void {
    const event = new CustomEvent('album', {
      detail: { album: undefined },
    });
    document.dispatchEvent(event);
    return undefined;
  }

  selectAlbum(albumName: string) {
    this.router.navigate(['album', albumName]);
  }
}
