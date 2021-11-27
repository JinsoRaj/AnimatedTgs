const TextToSVG = require('text-to-svg');
const express = require('express');
const { json } = require('express');
const app = express();
app.use(express.json());
//app.use(express.static('fonts')) 

app.get('/text2svg', async(req, res) => {

    let text = req.query.text || "@StickyApp";
    let color = req.query.color || "red";
    let stroke = req.query.stroke || color; // default stroke is text color (nil)
    //let font = req.query.font;
    let fontSize = req.query.fontsize || 50;

    const attributes = {
        fill: `${color}`,
        stroke: `${stroke}`
    };
    const options = {
        x: 210,
        y: 256,
        fontSize: fontSize,
        anchor: 'center middle',
        attributes: attributes
    };
    const svgTag = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512">`

    const defsvgPath = TextToSVG.loadSync().getPath(`${text}`, options);
    const btbsvgPath = TextToSVG.loadSync('./api/fonts/BacktoBlack.ttf').getPath(`${text}`, options);
    const bcsvgPath  = TextToSVG.loadSync('./api/fonts/Blkchcry.ttf').getPath(`${text}`, options);
    const cfsvgPath  = TextToSVG.loadSync('./api/fonts/CafeFrancoise.otf').getPath(`${text}`, options);
    const crsvgPath  = TextToSVG.loadSync('./api/fonts/CookieRegular.ttf').getPath(`${text}`, options);
    const qhsvgPath  = TextToSVG.loadSync('./api/fonts/Quikhand.ttf').getPath(`${text}`, options);
    const ymsvgPath  = TextToSVG.loadSync('./api/fonts/YouMurdererBB.ttf').getPath(`${text}`, options);

    res.json({
        text: `${text}`,
        defSvg: `${svgTag.concat(defsvgPath, "</svg>")}`,
        backTobSvg: `${svgTag.concat(btbsvgPath, "</svg>")}`,
        blackCrySvg: `${svgTag.concat(bcsvgPath, "</svg>")}`,
        cafeSvg: `${svgTag.concat(cfsvgPath, "</svg>")}`,
        cookieSvg: `${svgTag.concat(crsvgPath, "</svg>")}`,
        handSvg: `${svgTag.concat(qhsvgPath, "</svg>")}`,
        murderSvg: `${svgTag.concat(ymsvgPath, "</svg>")}`
    });
    
});

app.get('/', (req, res) => {
    res.redirect('https://github.com/JinsoRaj/AnimatedTgs#readme');
});
    
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;