import axios from 'axios';

async function getLTP(code, symbol) {
    console.log(code)
    console.log(symbol)
    const url = `https://api.upstox.com/v2/market-quote/ltp?instrument_key=NSE_EQ%7C${symbol}`;
    const token = 'eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI1VUFFV0MiLCJqdGkiOiI2NjExOGEyMjllODQyNzY2MDQ4NTBhOTgiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MTI0MjU1MDYsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcxMjQ0MDgwMH0.SmziV-6KhtHXM-3w6oM9XyS6QnUrCfajKG07iM0gkrs';

    
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data.data[`NSE_EQ:${code}`].last_price
        
    } 

export default getLTP;

