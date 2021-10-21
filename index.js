const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

app.post("/scanningForSale", (req, res) => {
    let cards = req.body;

    for (let i = 0; i < cards.length; i++) {
        writeData(cards[i].id, cards[i].preco, "Data");
    }

})
app.post("/scanningForRent", (req, res) => {
    let cards = req.body;

    for (let i = 0; i < cards.length; i++) {
        writeData(cards[i].id, cards[i].preco, "Rental_Data");
    }

})

function writeData(id, price, option) {

    var today = new Date();

    var hh = String(today.getHours()) < 10 ? "0" + today.getHours() : today.getHours();
    var min = String(today.getMinutes()) < 10 ? "0" + today.getMinutes() : today.getMinutes();
    var ss = String(today.getSeconds()) < 10 ? "0" + today.getSeconds() : today.getSeconds();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy + '-' + hh + ':' + min + ':' + ss;

    fs.appendFile(`./${option}/card-id-${id}.txt`, price + " --- " + today + `\n`, (err) => {
        if (err) throw err;
    });

    if (option == "Rental_Data") {
        if (isLegendary(id)) {
            let nameCard = witchCard(id);
            if (price < 2) {
                fs.appendFile(`./LegendaryCheap/id-${id}-${nameCard}.txt`, price + " --- " + today + `\n`, (err) => {
                    if (err) throw err;
                });
            }
        }
    }
}

function isLegendary(id) {
    let myLegendarys = [201, 202, 211, 249, 254, 267, 277, 286, 336, 339, 342];
    for (var cid of myLegendarys) {
        if (cid == id) return true;
    }
    return false;
}

function witchCard(id) {
    switch (id) {
        case 201:
            return "The_Vigilator";
        case 202:
            return "Scale_Doctor";
        case 211:
            return "Gloridax_Guardian";
        case 249:
            return "Spirit_Druid_Grog";
        case 254:
            return "Lir_DeepsWimmer";
        case 267:
            return "Cthuthu";
        case 277:
            return "LensMaster";
        case 286:
            return "Almo_Cambio";
        case 336:
            return "Djinn_Biljka"
        case 339:
            return "Djinn_Oshannus";
        case 342:
            return "Harklaw";
        default:
            return "ERROR";
    }
}

app.listen(8000, () => {
    console.log("server online");
})