import fetch from "node-fetch";
import HTMLParser from "node-html-parser";
import fs from "fs";
var novel = [];
class NovelService {
  constructor() {}
  test(req, res) {
    var page = ``;
    for (var i = 500; i < 600; i++) {
      page = `${page} <h3>${novel[i]?.titulo}</h3>`;
      novel[i]?.cap.forEach((c) => {
        page = `${page} <div>${c}</div>`;
      });
    }
    // novel.forEach((cap) => {
    //   page = `${page} <h3>${cap.titulo}</h3>`;
    //   cap.cap.forEach((c) => {
    //     page = `${page} <div>${c}</div>`;
    //   });
    // });

    return res.send(page);
  }
  async buscarNovel(req, res) {
    if (!req.query.url) {
      return res.send({
        status: 400,
        message: "Parametros invalidos para à consulta",
      });
    }
    try {
      const htmlCap = await fetchLinksUrl(req.query.url);
      htmlCap.forEach((item, index) => {
        salvarNovel(item, index);
      });
      return res.json(htmlCap);
    } catch (error) {
      console.error(error);
      return res.send({
        status: 400,
        message: error,
      });
    }
  }
  async recurararLinksCap(req, res) {}
}

async function fetchNovelUrl(url) {
  try {
    const teste = await fetch(url);
    const html = await teste.text();
    const root = HTMLParser.parse(html);

    const p = root.querySelectorAll("p");
    const h = root.querySelector("h2");

    const htmlCap = { titulo: h.innerHTML, cap: [] };
    p.forEach((item) => {
      htmlCap.cap.push(`${item.innerHTML}`);
    });
    return htmlCap;
  } catch (error) {
    return new Error(error);
  }
}

async function fetchLinksUrl(url) {
  try {
    const teste = await fetch(url);
    const html = await teste.text();
    const root = HTMLParser.parse(html);

    const p = root.querySelectorAll(".chp-item");
    const h = root.querySelector("h2");

    var cap = [];
    p.forEach((item) => {
      cap.push(`${item.childNodes[1].getAttribute("href")}`);
    });
    cap = cap.reverse();
    return cap;
  } catch (error) {
    return new Error(error);
  }
}

async function salvarNovel(url, num) {
  const cap = await fetchNovelUrl(url);
  novel[num] = cap;
  console.log(cap.titulo);
}
export default new NovelService();
