import { Injectable } from '@angular/core';
import fs from 'fs';
import path from 'path';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}
  readonly albumPath = './src/app/photos';

  getFiles(dir: string) {
    return [
      { name: 'file1.txt', path: '/files/file1.txt' },
      { name: 'file2.txt', path: '/files/file2.txt' },
      { name: 'file3.txt', path: '/files/file3.txt' },
    ];
  }

  //  getFolders(): string[] {
  //     return fs
  //       .readdirSync(, { withFileTypes: true })
  //       .filter((dirent) => dirent.isDirectory())
  //       .map((dirent) => path.join(dir, dirent.name));
  //   }

  getAlbumLocation() {
    return path.resolve(process.cwd(), this.albumPath);
  }
}
