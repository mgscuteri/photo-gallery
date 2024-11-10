import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, effect, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private _activeAlbum$: BehaviorSubject<string | undefined>;
  public _photos$: Observable<PhotoMetadata[] | undefined>;
  public _albums$: Observable<Album[] | undefined>;

  public photosSig: Signal<PhotoMetadata[] | undefined>;
  public albumsSig: Signal<Album[] | undefined>;
  public activeAlbumSig: Signal<string | undefined>;

  constructor(private http: HttpClient, cdr: ChangeDetectorRef) {
    this._albums$ = this.getAlbums();
    this._activeAlbum$ = new BehaviorSubject<string | undefined>(undefined);
    this._photos$ = this._activeAlbum$.pipe(
      filter((activeAlb) => activeAlb !== undefined),
      switchMap((activeAlb) => this.getPhotos(activeAlb))
    );
    this.photosSig = toSignal(this._photos$);
    this.albumsSig = toSignal(this._albums$);
    this.activeAlbumSig = toSignal(this._activeAlbum$);

    effect(() => {
      console.log(this.photosSig());
      cdr.detectChanges();
    });
  }

  setActiveAlbum(album: string) {
    this._activeAlbum$.next(album);
  }

  private getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('http://thetoaster.ddns.net:81/albums');
  }

  private getPhotos(alumbId: string): Observable<PhotoMetadata[]> {
    return this.http.get<PhotoMetadata[]>(
      `http://thetoaster.ddns.net:81/albums/${alumbId}`
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
