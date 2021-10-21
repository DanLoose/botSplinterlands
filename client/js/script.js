const URL = "https://steemmonsters.com";
const serverURL = "http://192.168.0.3:8000/";


function getMarketForSale(option1, option2) {
    fetch(URL + `/market/${option1}`).then(res => {

        res.json().then(json => {
            let market = json;

            let low_price = [];

            for (let i = 0; i < market.length; i++) {
                if (market[i].gold == false) {

                    var card = {
                        id: market[i].card_detail_id,
                        preco: market[i].low_price,
                    }

                    low_price.push(card);

                }
            }

            const data = {
                method: "POST",
                headers: new Headers({ "content-type": 'application/json' }),
                body: JSON.stringify(low_price),
            }

            fetch(serverURL + option2, data).then(res => {
                console.log(res);
            })

        });
    })
}



