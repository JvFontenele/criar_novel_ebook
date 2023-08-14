import fetch from "node-fetch";
import HTMLParser from "node-html-parser";
import novel from "./novel.json" assert { type: "json" };
import fs from "fs";

class novelManiaService {
  constructor() {}

  async buscarLinksNovel(req, res) {
    if (!req.query.url) {
      return res.send({
        status: 400,
        message: "Parametros invalidos para à consulta",
      });
    }
    try {
      var novelCompleta = [];
      const links = await buscarLinks(req.query.url);

      return res.send(links);
    } catch (error) {
      console.error(error);
      return res.send({
        status: 400,
        message: error,
      });
    }
  }

  async buscarNovel(req, res) {
    if (!req.query.url) {
      return res.send({
        status: 400,
        message: "Parametros invalidos para à consulta",
      });
    }
    try {
      var novelHtml = ''
      var novelCompleta = await buscarLinks(req.query.url);
      for (let index = +req.query.inicio; index <= +req.query.fim; index++) {
        const capitulo = await buscarCapitulo(`https://novelmania.com.br${novelCompleta[index]}`);
        console.log("capitulo: " + index);
        if (capitulo) {
          novelHtml = `${novelHtml}${capitulo}`
          salvarnovel(capitulo);
          // novelCompleta[index] = capitulo;
        }
      }
      return res.send(novelHtml);
    } catch (error) {
      console.error(error);
      return res.send({
        status: 400,
        message: error,
      });
    }
  }
}
async function buscarLinks(url) {
  const teste = await fetch(url);
  const html = await teste.text();
  const root = HTMLParser.parse(html);
  const content = root.querySelector("#chapters");

  const links = content.querySelectorAll("a");

  var cap = [];
  links.forEach((item) => {
    if (item.innerHTML) {
      if (!item.parentNode.querySelector(".alert ")) {
        cap.push(item.getAttribute("href"));
      }
    }
  });

  return cap;
}
async function buscarCapitulo(url) {
  try {
    const teste = await fetch(url);
    const html = await teste.text();
    const root = HTMLParser.parse(html);

    const content = root.querySelector("#chapter-content");
    if (!content) {
      return false;
    }
    const capitulo = content.querySelectorAll("p");
    const livro = content.querySelector("h1");
    const titulo = content.querySelector("h2");
    var cap = `<h2>${titulo}</h2>`;
    capitulo.forEach((item) => {
      cap = `${cap}<div>${item.innerHTML}</div>`;
    });
    return cap;
  } catch (error) {
    return new Error(error);
  }
}

async function salvarnovel(capitulo) {
  fs.appendFile("novel.html", capitulo, function (err) {
    if (err) throw err;
  });
}

export default new novelManiaService();
