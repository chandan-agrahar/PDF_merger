import PDFMerger from 'pdf-merger-js';
import fs from 'fs'


var merger = new PDFMerger();

const pdfMerger = async (p1,p2, id) => {
  await merger.add(p1);  //merge all pages
  await merger.add(p2); // merge only pdf 2
  await merger.save(`./src/public/${id}_merged.pdf`);

   //to remove 1st pdf
   fs.unlink(p1, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }});

    //to remove 2nd pdf
    fs.unlink(p2, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return;
      }});
};


export {pdfMerger as pdfMerger} //