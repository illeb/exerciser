const nodeFetch = require('node-fetch');
const fetch = require('fetch-cookie')(nodeFetch)
const cheerio = require('cheerio');
const fs = require('fs');

const waitFor = (delay: number | undefined) => new Promise(resolve => setTimeout(resolve, delay));

function get$(url: string) {
  return fetch(url)
    .then((result: { text: () => any; }) => result.text())
    .then((html: any) => cheerio.load(html))
}
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const baseURL = 'http://www.mininterno.net';
const parseQuestions = async (bancaDatiId: number) => {

  // const $ = await get$(`${baseURL}/beginc.asp?idc=813`);
  const $ = await get$(`${baseURL}/beginc.asp?idc=${bancaDatiId}`);
  const categorie = $('.eleline2').toArray().map((value: any) => {
    const nodoLink = $(value);
    return {
      categoria: nodoLink.contents().first().text(),
      nDomande: +nodoLink.find('.eleque2').text().replace(/\(*(quesiti)*\)*/g, '').trim(),
      link: nodoLink.attr().href
    }  
  });

  // TODO: da rimuovere categorie
  const categorieDomande = await Promise.all(categorie.slice(0, 1).map(async ({categoria, link, nDomande}: any) => {
    nDomande = 1;
    const idCategoria = link.split('ida')[1];
    let domande: any[] = [];
    // Questa costruzione è orribile, ma è l'unico modo per creare una catena operazioni scadenzate tra i 3 e 5 secondi
    for(let i = 0; i < nDomande; i++) {
      const quizLink = `${baseURL}/maketest.asp?tif=2&max=${90}&ida=${idCategoria}&sx=0&ord=1&ini=${i+1}`;
      const $ = await get$(quizLink);
      const domanda = $('.tDomanda').text().replace('Cerca con Google...', '');
      const risposte = $('.tRisposta').toArray().map((value: any) => $(value).text().substring(1));

      let rispostaEsatta = $('body').html().split('\n').find((s: string | string[]) => s.indexOf('function rightAns(') != -1);
      rispostaEsatta = +rispostaEsatta.split('"')[1].slice(0,1);

      domande = domande.concat({
        domanda,
        risposte,
        rispostaEsatta
      });
      await waitFor(getRandomArbitrary(3500, 5230))
    }

    return {
      categoria,
      domande
    }
  }));
  return categorieDomande;
}

export { parseQuestions };