const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

const args = process.argv.slice(2);
let reverse = args.some(it => /^--?r(everse)?$/.test(it));
let thumbs = args.some(it => /^--?t(humbs)?$/.test(it));
let images = args.some(it => /^--?i(mages)?$/.test(it));
if (!thumbs && !images) {
    thumbs = true;
    images = true;
}

for (const arg of args) {
    if (arg.indexOf('-') === 0) {
        continue;
    }
    const src = path.join(arg, 'src');
    fs.readdir(src, (err, files) => {
        if (reverse) {
            files = files.sort((a, b) => a < b ? 1 : -1);
        } else {
            files = files.sort();
        }
        let i = 0;
        for (let file of files) {
            (j => {
                let f = path.join(src, file);
                jimp.read(f).then(image => {
                    const name = `stairs${j < 10 ? '0' + j.toString() : j}.jpg`;
                    console.log(f, '>', name);
                    if (images) {
                        image
                            .scaleToFit(2048, 2048)
                            .quality(80)
                            .write(path.join(arg, name));
                    }
                    if (thumbs) {
                        image
                            .resize(512, jimp.AUTO)
                            .quality(80)
                            .write(path.join(arg, 'thumbs', name));
                    }
                });
            })(i++);
        }
    });
}