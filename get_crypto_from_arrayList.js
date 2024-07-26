// get_crypto_from_arrayList.js
import getCryptocurrenciesFromJson from './get_cryptocurrency_from_json.js';

const getCryptoBySymbol = async (symbol) => {
    const cryptocurrencies = await getCryptocurrenciesFromJson();
    return cryptocurrencies.find(crypto => crypto.symbol === symbol);
};

export default getCryptoBySymbol;
