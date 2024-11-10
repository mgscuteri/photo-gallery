// https://medium.com/medialesson/hosting-an-angular-application-with-express-31237756722f

import express, { Request, Response } from "express";
import path from "path";

const port = 80;

const app = express();

const pathToBrowserfolder = path.join(__dirname, "browser");
const pathToIndexHtml = path.join(pathToBrowserfolder, "index.html");
console.log("Serving: " + pathToBrowserfolder);

// Serve the known static content
app.use(express.static(pathToBrowserfolder, {}));

// Return index.html for any unknown request
app.use("*", (_req: Request, res: Response) => {
  res.sendFile(pathToIndexHtml);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
