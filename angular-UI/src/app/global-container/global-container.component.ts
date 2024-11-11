import {
  Component,
  computed,
  effect,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-global-container',
  standalone: true,
  imports: [CommonModule],
  providers: [AlbumsService],
  templateUrl: './global-container.component.html',
  styleUrl: './global-container.component.scss',
})
export class GlobalContainerComponent {
  activeAlbum: WritableSignal<string | undefined> = signal(undefined);
  title = computed(() => {
    return this.activeAlbum() ?? 'Albums';
  });

  constructor(
    private route: ActivatedRoute,
    public albumsService: AlbumsService
  ) {
    document.addEventListener(
      'album',
      (e) => {
        const event = e as CustomEvent;
        this.activeAlbum.set(event.detail.album);
      },
      false
    );
  }
}
