const nodeFetch = require('node-fetch');
const fetch = require('fetch-cookie')(nodeFetch)

const cheerio = require('cheerio');
const fs = require('fs');
const baseURL = 'http://www.mininterno.net';

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

(async () => {
    const $ = await get$(`${baseURL}/beginc.asp?idc=813`);
    const categorie = $('.eleline2').toArray().map((value) => {
      const nodoLink = $(value);
      return {
        categoria: nodoLink.contents().first().text(),
        nDomande: +nodoLink.find('.eleque2').text().replace(/\(*(quesiti)*\)*/g, '').trim(),
        link: nodoLink.attr().href
      }  
  });

  
  // TODO: da rimuovere categorie
  const domandeCategoria = categorie.slice(0, 1).map(async ({categoria, link, nDomande}) => {
    nDomande = 3;
    const idCategoria = link.split('ida')[1];
    let domande = [...Array(nDomande).keys()].map(async (index) => {
      await waitFor(getRandomArbitrary(3500, 5500))
      const quizLink = `${baseURL}/maketest.asp?tif=2&max=${90}&ida=${idCategoria}&sx=0&ord=1&ini=${index+1}`;
      const $ = await get$(quizLink);
      const domanda = $('.tDomanda').text().replace(':Cerca con Google...', '');
      const risposte = $('.tRisposta').toArray().map(value => $(value).text().substring(1));

      let rispostaEsatta = $('body').html().split('\n').find(s => s.indexOf('function rightAns(') != -1);
      rispostaEsatta = +rispostaEsatta.split('"')[1].slice(0,1);

      return {
        domanda,
        risposte,
        rispostaEsatta
      }
    })
    domande = await Promise.all(domande)
    console.log(domande);
  });
})();

function get$(url) {
  return fetch(url)
    .then((result) => result.text())
    .then((html) => cheerio.load(html))
}
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}