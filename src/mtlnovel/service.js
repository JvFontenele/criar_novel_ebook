import fetch from "node-fetch";
import HTMLParser from "node-html-parser";
import myJson from "./novel.json" assert { type: "json" };

var novel = [];

class novelmaniaService {
  constructor() {}
  async recurararLinksCap(req, res) {
    try {
      // myJson.forEach(async (item, index) => {
      //   if (index == 0) {

      //   }
      // });
   const teste =  await fetchNovelUrl('https://www.mtlnovel.com/i-have-a-trillion-protagonists-halo/chapter-1-million-billion-protagonist-halo/');
      return res.send(teste);
    } catch (error) {
      console.error(error);
      return res.send({
        status: 400,
        message: error,
      });
    }
  }
}

async function fetchNovelUrl(url) {
  try {
    const teste = await fetch(url);
    const html = await teste.text();
    const root = HTMLParser.parse(html);
    
    const p = root.querySelectorAll("p");
    console.log(p);
    // const h = root.querySelector("h2");

    // const htmlCap = { titulo: h.innerHTML, cap: [] };
    // p.forEach((item) => {
    //   htmlCap.cap.push(`${item.innerHTML}`);
    // });
    return html;
  } catch (error) {
    return new Error(error);
  }
}

export default new novelmaniaService();
