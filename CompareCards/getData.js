const URL = "https://steemmonsters.com";
const COINGECKO = "https://api.coingecko.com/api/v3";

const DEC_ID = "dark-energy-crystals";
var DECUSD = 0.0104;

window.addEventListener("DOMContentLoaded", () => {
    getCoin();
    getUSDBRL();
});

function getCoin() {
    fetch(COINGECKO + `/coins/${DEC_ID}`).then(res => {
        res.json().then(json => {

            DECUSD = json.market_data.current_price.usd;

        })
    })
}

function getUSDBRL() {
    fetch("https://economia.awesomeapi.com.br/last/USD-BRL").then(res => {
        res.json().then(async json => {

            console.log(json.USDBRL.low);

        })
    })
}


function getData() {
    fetch(URL + "/market/for_sale_grouped").then(res => {

        var cardsSale = [];
        var cardsRent = [];

        res.json().then(json => {

            cardsSale = json;

            fetch(URL + "/market/for_rent_grouped").then(res => {

                res.json().then(json => {

                    cardsRent = json;

                    for (element of cardsRent) {
                        for (elem of cardsSale) {
                            if (elem.card_detail_id == element.card_detail_id && elem.edition == element.edition && elem.gold == element.gold) {
                                if (element.low_price > 20) {

                                    myData.card_info.push({
                                        id: elem.card_detail_id,
                                        edition: elem.edition,
                                        gold: elem.gold,
                                        ROI: parseFloat(((element.low_price * DECUSD * 30) / elem.low_price).toFixed(3)),
                                        low_price_rent: element.low_price * 0.0104 * 30,  //dec
                                        low_price_sale: elem.low_price,     //dolar
                                    })
                                }
                            }
                        }
                        myData.organize();
                    }
                })
            })
        })
    })
}

var myData = {
    card_info: [

    ],

    topPrices: [

    ],

    organize() {
        this.card_info.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    },

    getBestOption(gold) {

        let maior_ROI = this.card_info[0].ROI;
        let res = {};

        for (let i = 0; i < this.card_info.length; i++) {
            if (this.card_info[i].gold == gold) {
                if (this.card_info[i].ROI > maior_ROI) {
                    res = {
                        id: this.card_info[i].id,
                        gold: this.card_info[i].gold,
                        roi: this.card_info[i].ROI,
                        price: `$${this.card_info[i].low_price_sale}`,
                        rent: `$${this.card_info[i].low_price_rent}/mes`,
                    }
                }
            }
        }
        this.topPrices.push(res);
        console.log(this.topPrices);

    },
}

setInterval(() => {
    getData();
}, 10000)