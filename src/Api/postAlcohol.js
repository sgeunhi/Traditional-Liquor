import {getHtml} from "./getHtml";
import cheerio from "cheerio";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../Firebase/service";

class Alcohol {
  constructor(name, detailUrl, imageUrl, description, typeofAlcohol, alcohol, volume, price) {
    this.name = name;
    this.detailUrl = detailUrl;
    this.imageUrl = imageUrl;
    this.description = description;
    this.typeofAlcohol = typeofAlcohol;
    this.alcohol = alcohol;
    this.volume = volume;
    this.price = price;
  }
}
const postAlcohol = () => {
  getHtml().then(html => {
    let ulList = [];
    console.log(ulList)
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list_wrap ul.content_list").children("li");
    $bodyList.each(function (i, elem) {
      const alcohol = new Alcohol(
        $(this).find('div.iner span:nth-child(1) em.data').text(),
        'https://terms.naver.com/' + $(this).find('strong.title a').attr('href'),
        $(this).find('div.thumb_area a img').attr('data-src'),
        $(this).find('div.info_area p').text().replace(/\n|\t/g, ""),
        $(this).find('div.iner span:nth-child(2) em.data').text(),
        parseFloat($(this).find('div.iner span:nth-child(3) em.data').text().replace("%","")),
        parseFloat($(this).find('div.iner span:nth-child(4) em.data').text().split(' ')[0].replace("ml","")),
        parseFloat($(this).find('div.iner span:nth-child(5) em.data').text().split('(')[0].replace(" \g", "").replace("￦", "").replace(",","")))
      ulList[i] = alcohol;
      // console.log(alcohol);
    });
    return ulList;
  }).then(res => {
    res.map(data => {
      const _data = data;
      addDoc(collection(db, "alcohols"), {
        name: _data.name,
        detailUrl: _data.detailUrl,
        imageUrl: _data.imageUrl,
        description: _data.description,
        typeofAlcohol: _data.typeofAlcohol,
        alcohol: _data.alcohol,
        volume: _data.volume,
        price: _data.price
      });
    })
  })
  console.log("saved!!")
};

export default postAlcohol;
