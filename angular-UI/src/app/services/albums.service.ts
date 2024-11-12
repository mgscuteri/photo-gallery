import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, mergeMap, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private _photos$: Observable<PhotoMetadata[] | undefined>;
  public photosSig: Signal<PhotoMetadata[] | undefined>;
  public albumsSig: Signal<Album[] | undefined>;
  public activeAlbum$: BehaviorSubject<string | undefined>;
  public activeAlbumSig: Signal<string | undefined>;

  constructor(private http: HttpClient, private router: Router) {
    this.activeAlbum$ = new BehaviorSubject<string | undefined>(undefined);
    this._photos$ = this.activeAlbum$.pipe(
      mergeMap((alb) => {
        if (alb === undefined) {
          return of(undefined);
        }
        return this.getPhotos(alb);
      })
    );
    this.albumsSig = toSignal(this.getAlbums());
    this.photosSig = toSignal(this._photos$);
    this.activeAlbumSig = toSignal(this.activeAlbum$);
  }

  private getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>('https://thetoaster.ddns.net/albums');
  }

  private getPhotos(alumbId: string): Observable<PhotoMetadata[]> {
    return this.http.get<PhotoMetadata[]>(
      `https://thetoaster.ddns.net/albums/${alumbId}`
    );
  }

  public selectAlbum(albumName: string | undefined) {
    if (albumName === undefined) {
      this.router.navigate(['/']);
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['album', albumName]);
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
