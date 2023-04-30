const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

const args = process.argv.slice(2);
for (const dir of args) {
    const src = path.join(dir, 'src');
    fs.readdir(src, (err, files) => {
        files = files.sort();
        let i = 0;
        for (let file of files) {
            (j => {
                let f = path.join(src, file);
                jimp.read(f).then(image => {
                    console.log('Import ', f);
                    const name = `stairs${j < 10 ? '0' + j.toString() : j}.jpg`;
                    image
                        .scaleToFit(2048, 2048)
                        .quality(95)
                        .write(path.join(dir, name));
                    image
                        .resize(512, jimp.AUTO)
                        .quality(90)
                        .write(path.join(dir, 'thumbs', name));
                });
            })(i++);
        }
    });
}