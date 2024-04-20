const stocks = json.stocks;
const symbols = stocks.map(stock => stock.symbol);
const axios = require('axios');

function place(symb) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.upstox.com/v2/order/place',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            // Replace placeholders with your actual credentials and values
            "api_key": "YOUR_API_KEY",
            "quantity": 1,
            "product": "D",
            "validity": "DAY",
            "price": 0,
            "tag": "string",
            "instrument_token": symb, // Remove ${} and use symb directly
            "order_type": "MARKET",
            "transaction_type": "BUY",
            "disclosed_quantity": 0,
            "trigger_price": 0,
            "is_amo": false
        }
    };

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.error(error);
        });
}

for (const symb of symbols) { // Use for...of loop to iterate over symbols
    place(symb);
}
