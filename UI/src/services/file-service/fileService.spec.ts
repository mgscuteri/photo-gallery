import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileService } from './fileService';

describe('FileSErvice', () => {
  let fileService: FileService;

  beforeEach(async () => {
    fileService = new FileService();
  });

  it('should create', () => {
    expect(fileService).toBeTruthy();
  });

  // it(`should folder list`, () => {
  //   const list = fileService.
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('photo-lib');
  // });

  it('should get photo album dir', () => {
    const alumbDir = fileService.getAlbumLocation();
    expect(alumbDir).toBe('');
  });
});
