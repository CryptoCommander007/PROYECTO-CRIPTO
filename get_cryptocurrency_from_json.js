// get_cryptocurrency_from_json.js
import Cryptocurrency from './cryptocurrency_object.js';

const getCryptocurrenciesFromJson = async () => {
    const response = await fetch('https://actualidadfinanciera.com/cripto/cripto.json');
    const jsonData = await response.json();

    const cryptocurrencies = jsonData.data.map(cryptoData => new Cryptocurrency(cryptoData));
    return cryptocurrencies;
};

export default getCryptocurrenciesFromJson;
