import getCryptoBySymbol from 'https://actualidadfinanciera.com/cripto/get_crypto_from_arrayList.js';

document.addEventListener('DOMContentLoaded', async () => {
    const symbol = 'BTC';
    const cryptocurrency = await getCryptoBySymbol(symbol);
    if (cryptocurrency) {
        displayCryptoData(cryptocurrency);
    } else {
        alert('Criptomoneda no encontrada');
    }
});

function displayCryptoData(crypto) {
    const tableBody = document.getElementById('cryptoTableBody');
    const cryptoIcon = document.getElementById('cryptoIcon');
    const cryptoName = document.getElementById('cryptoName');
    const cryptoSymbol = document.getElementById('cryptoSymbol');
    const cryptoMarketCap = document.getElementById('cryptoMarketCapValue');
    const cryptoFullyDilutedMarketCap = document.getElementById('cryptoFullyDilutedMarketCap');
    const cryptoInfiniteSupply = document.getElementById('cryptoInfiniteSupply');
    const cryptoTotalSupply = document.getElementById('cryptoTotalSupply');
    const cryptoMaxSupply = document.getElementById('cryptoMaxSupply');
    const cryptoCirculatingSupply = document.getElementById('cryptoCirculatingSupply');
    const progressBarFill = document.getElementById('progressBarFill');
    const cryptoChange1h = document.getElementById('cryptoChange1h');
    const cryptoChange24h = document.getElementById('cryptoChange24h');
    const cryptoChange7d = document.getElementById('cryptoChange7d');
    const cryptoChange30d = document.getElementById('cryptoChange30d');
    const cryptoChange60d = document.getElementById('cryptoChange60d');
    const cryptoChange90d = document.getElementById('cryptoChange90d');
    const cryptoDominancePercentage = document.getElementById('cryptoDominancePercentage');
    const dominanceChart = document.getElementById('dominanceChart');

    cryptoIcon.src = `https://actualidadfinanciera.com/cripto/icon/${crypto.symbol.toUpperCase()}.png`;
    cryptoIcon.onerror = () => {
        cryptoIcon.src = 'https://actualidadfinanciera.com/cripto/icon/BASE.png';
    };
    cryptoName.textContent = crypto.name;
    cryptoSymbol.textContent = crypto.symbol;

    document.getElementById('cryptoPrice').textContent = formatCurrency(crypto.quote.USD.price);
    document.getElementById('cryptoVolume24h').textContent = formatCurrency(crypto.quote.USD.volume_24h);
    setChangeData(crypto.quote.USD.percent_change_1h, cryptoChange1h, 'cryptoChange1hIcon');
    setChangeData(crypto.quote.USD.percent_change_24h, cryptoChange24h, 'cryptoChange24hIcon');
    setChangeData(crypto.quote.USD.percent_change_7d, cryptoChange7d, 'cryptoChange7dIcon');
    setChangeData(crypto.quote.USD.percent_change_30d, cryptoChange30d, 'cryptoChange30dIcon');
    setChangeData(crypto.quote.USD.percent_change_60d, cryptoChange60d, 'cryptoChange60dIcon');
    setChangeData(crypto.quote.USD.percent_change_90d, cryptoChange90d, 'cryptoChange90dIcon');

    cryptoMarketCap.textContent = formatCurrency(crypto.quote.USD.market_cap);
    cryptoFullyDilutedMarketCap.textContent = formatCurrency(crypto.quote.USD.fully_diluted_market_cap);

    cryptoInfiniteSupply.textContent = crypto.infinite_supply ? 'Sí' : 'No';
    cryptoTotalSupply.textContent = formatNumber(crypto.total_supply);
    cryptoMaxSupply.textContent = formatNumber(crypto.max_supply);
    cryptoCirculatingSupply.textContent = formatNumber(crypto.circulating_supply);

    cryptoDominancePercentage.textContent = formatPercentage(crypto.quote.USD.market_cap_dominance);

    dominanceChart.style.setProperty('--value', `${crypto.quote.USD.market_cap_dominance}%`);
    dominanceChart.setAttribute('data-percentage', formatPercentage(crypto.quote.USD.market_cap_dominance));

    const progressPercentage = calculatePercentage(crypto.circulating_supply, crypto.max_supply);
    progressBarFill.style.width = `${progressPercentage}%`;
    progressBarFill.textContent = `${progressPercentage}%`;

    tableBody.innerHTML = `
        <tr>
            <td>${crypto.id}</td>
            <td>${crypto.name}</td>
            <td>${crypto.symbol}</td>
            <td>${crypto.slug}</td>
            <td>${crypto.num_market_pairs}</td>
            <td>${crypto.date_added}</td>
            <td>${crypto.max_supply}</td>
            <td>${crypto.circulating_supply}</td>
            <td>${crypto.total_supply}</td>
            <td>${crypto.infinite_supply}</td>
            <td>${crypto.platform}</td>
            <td>${crypto.cmc_rank}</td>
            <td>${crypto.self_reported_circulating_supply}</td>
            <td>${crypto.self_reported_market_cap}</td>
            <td>${crypto.tvl_ratio}</td>
            <td>${crypto.last_updated}</td>
            <td>${crypto.quote ? JSON.stringify(crypto.quote) : 'N/A'}</td>
        </tr>
    `;
}

function setChangeData(change, element, iconId) {
    const icon = document.getElementById(iconId);
    if (change > 0) {
        element.textContent = `${formatPercentage(change)} `;
        element.className = 'positive';
        icon.className = 'fas fa-arrow-up positive';
    } else {
        element.textContent = `${formatPercentage(change)} `;
        element.className = 'negative';
        icon.className = 'fas fa-arrow-down negative';
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

function formatPercentage(value) {
    return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
}

function calculatePercentage(current, max) {
    return max ? ((current / max) * 100).toFixed(2) : 0;
}
