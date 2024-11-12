import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-container',
  templateUrl: './global-container.component.html',
  styleUrl: './global-container.component.scss',
})
export class GlobalContainerComponent {
  title = computed(() => {
    return this.albumsService.activeAlbumSig() ?? 'Albums';
  });

  back = computed(() => {
    return this.albumsService.activeAlbumSig() ? 'Back to Albums' : null;
  });

  constructor(
    private route: ActivatedRoute,
    public albumsService: AlbumsService
  ) {}

  onBack() {
    this.albumsService.selectAlbum(undefined);
  }
}
