import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  public _activeAlbum$: Observable<string | undefined>;
  public _photos$: Observable<PhotoMetadata[] | undefined>;
  public _albums$: Observable<Album[] | undefined>;

  public photosSig: Signal<PhotoMetadata[] | undefined>;
  public albumsSig: Signal<Album[] | undefined>;
  public activeAlbumSig: Signal<string | undefined>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this._albums$ = this.getAlbums();
    this._activeAlbum$ = this.route.url.pipe(
      map((urlSegments) => {
        if (urlSegments[0].path === 'album') {
          // terrible hack because injecting _activeAlbum into global header does not work
          const event = new CustomEvent('album', {
            detail: { album: urlSegments[1].path },
          });
          document.dispatchEvent(event);
          return urlSegments[1].path;
        }
        const event = new CustomEvent('album', {
          detail: { album: undefined },
        });
        document.dispatchEvent(event);
        return undefined;
      })
    );

    this._photos$ = this._activeAlbum$.pipe(
      filter((activeAlb) => activeAlb !== undefined),
      switchMap((activeAlb) => this.getPhotos(activeAlb))
    );
    this.photosSig = toSignal(this._photos$);
    this.albumsSig = toSignal(this._albums$);
    this.activeAlbumSig = toSignal(this._activeAlbum$);
  }

  private getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('https://thetoaster.ddns.net/albums');
  }

  private getPhotos(alumbId: string): Observable<PhotoMetadata[]> {
    return this.http.get<PhotoMetadata[]>(
      `https://thetoaster.ddns.net/albums/${alumbId}`
    );
  }
}

export type Album = {
  albumName: string;
  thumbNail: string;
};

export type ExifData = {
  image: {
    Make: string;
    Model: string;
    Software: string;
  };
  exif: {
    FocalLength: string;
    ExposureTime: string;
    FNumber: string;
    ISO: number;
    DateTimeOriginal: string;
  };
};

export type PhotoMetadata = {
  fileName: string;
  exifData: ExifData;
};
