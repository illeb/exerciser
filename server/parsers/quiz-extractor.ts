import { Category } from "../model/category";
import { Quiz } from "../model/quiz";

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
const parseQuestions = async (bancaDatiId: number): Promise<Category[]> => {

  // const $ = await get$(`${baseURL}/beginc.asp?idc=813`);
  const $ = await get$(`${baseURL}/beginc.asp?idc=${bancaDatiId}`);
  let categorie = $('.eleline2').toArray().map((value: any) => {
    const nodoLink = $(value);
    return {
      categoria: nodoLink.contents().first().text(),
      nDomande: +nodoLink.find('.eleque2').text().replace(/\(*(quesiti)*\)*/g, '').trim(),
      link: nodoLink.attr().href
    }
  }).filter((categoria: any) => !categoria.link.includes('idc'));

  const categorieDomande = await Promise.all(categorie.map(async ({categoria, link, nDomande}: any, index: number) => {
    const idCategoria = link.split('ida')[1];
    let domande: Quiz[] = [];
    console.log(`categoria ${index + 1}/${categorie.length}\n\t`)
    // Questa costruzione è orribile, ma è l'unico modo per creare una catena operazioni scadenzate tra i 3 e 5 secondi
    for(let i = 0; i < nDomande; i++) {
      const quizLink = `${baseURL}/maketest.asp?tif=2&ida=${idCategoria}&sx=0&ord=1&ini=${i+1}`;
      const $ = await get$(quizLink);
      const domanda = $('.tDomanda').text().replace('Cerca con Google...', '');
      const risposte = $('.tRisposta').toArray().map((value: any) => $(value).text().substring(1));

      let rispostaEsatta = $('body').html().split('\n').find((s: string | string[]) => s.indexOf('function rightAns(') != -1);
      rispostaEsatta = +rispostaEsatta.split('"')[1].slice(0,1) - 1; // la risposta è in base uno, per questo -1

      domande = domande.concat(new Quiz(null, domanda, risposte, risposte[rispostaEsatta]));

      process.stdout.clearLine(0);  // clear current text
      process.stdout.cursorTo(0);  // move cursor to beginning of line
      process.stdout.write(`${i + 1}/${nDomande},`);
      await waitFor(getRandomArbitrary(900, 1500))
    }

    return new Category(null, categoria, domande);
  }));

  return categorieDomande as Category[];
}

export { parseQuestions };