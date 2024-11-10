import fs from "fs";
import path from "path";
import { ALBUMS_DIR } from "../routes/files/files";

export class FileService {
  constructor() {}

  public static getAlbumLocation() {
    return path.resolve(
      process.argv[1].replace("/src/", "").replace("/build/", ""),
      "..",
      "albums"
    );
    // if (!process.env[ALBUMS_DIR]) {
    //   return path.resolve(process.cwd(), "..", "albums");
    // } else {
    //   return process.env[ALBUMS_DIR];
    // }
  }

  public static getStaticUILocation() {
    return path.resolve(
      process.argv[1].replace("/src/", "").replace("/build/", ""),
      "..",
      "static-ui"
    );
    // if (!process.env[ALBUMS_DIR]) {
    //   return path.resolve(process.cwd(), "..", "albums");
    // } else {
    //   return process.env[ALBUMS_DIR];
    // }
  }
}
