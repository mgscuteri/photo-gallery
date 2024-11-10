import { Component, computed, Signal } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { ImageComponent } from '../image/image.component';
import { AlbumComponent } from '../album/album.component';

@Component({
  selector: 'app-album-selector',
  standalone: true,
  imports: [ImageComponent, AlbumComponent],
  providers: [AlbumsService],
  templateUrl: './album-selector.component.html',
  styleUrl: './album-selector.component.scss',
})
export class AlbumSelectorComponent {
  constructor(public albumsService: AlbumsService) {}

  selectAlbum(albumName: string) {
    this.albumsService.setActiveAlbum(albumName);
    history.pushState(
      { albumName },
      albumName,
      window.location.href + albumName
    );
  }
}
