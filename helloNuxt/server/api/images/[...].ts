import fs from 'node:fs'
import { sendStream } from 'h3';
import sharp from 'sharp';

export default defineEventHandler((event) => {

  // example /api/images/200/200

    const [widthReq, heightReq]: string[] = event.req.url.split('/').slice(-2);
    const width = +widthReq;
    const height = +heightReq;

    if(Number.isNaN(height) || Number.isNaN(width)) {
      event.res.writeHead(404, { 'content-type': 'image/jpeg' });
      event.res.end();
      return;
    }

    const listFile = fs.readdirSync('assets/images/');
    const indexImage = Math.floor(Math.random() * listFile.length);
    const inStream = fs.createReadStream(`assets/images/${listFile[indexImage]}`)
    const transform = sharp().resize({ width, height });

    event.res.writeHead(200, {'Cache-Control': 'public, max-age=86400'})

    return sendStream(event, inStream.pipe(transform))
  })