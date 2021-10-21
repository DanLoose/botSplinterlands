const button = document.querySelector("button");

setInterval(() => {
    console.log("scanning...");
    getMarketForSale("for_sale_grouped", "scanningForSale");
    getMarketForSale("for_rent_grouped", "scanningForRent");
}, 30000)

setInterval(() => {
    location.reload();
}, 40000)