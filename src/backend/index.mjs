import express from 'express'
import path from 'path'
import multer from 'multer';
import { fileURLToPath } from 'url';
//const {pdfMerger} = require('./merger.mjs')
import {pdfMerger} from './merger.mjs';

import fs from 'fs'

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/static",express.static('./src/public/'))
app.use(express.static(path.join(__dirname, "../frontend/")));

//var uniqid = require('uniqid'); 
import uniqid from 'uniqid';
// const {uniqid} = pkg;


//const upload = multer({ storage: multer.memoryStorage() });

const upload = multer({ dest: './src/public/' })



//const port = process.env.PORT || 3000;
const port = 3000

//app.use(express.static(path.join(__dirname, "../frontend/")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  });

  let id
app.post('/merge', upload.array('pdfs', 2), async function (req, res, next, id = uniqid()) {
  
    //console.log(req.files)
    await pdfMerger(req.files[0].path, req.files[1].path, id)
    // console.log(req.files)
    const plink = `http://localhost:3000/static/${id}_merged.pdf`
   res.redirect(plink) 

   //to remove merged file 
   /* fs.unlink(path.join(__dirname,`../public/${id}_merged.pdf`), (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }});*/
   //res.redirect('https://www.google.com')

})
  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})