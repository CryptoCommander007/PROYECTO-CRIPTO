// cryptocurrency_object.js

class Cryptocurrency {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.symbol = data.symbol;
        this.slug = data.slug;
        this.num_market_pairs = data.num_market_pairs;
        this.date_added = data.date_added;
        this.tags = data.tags;
        this.max_supply = data.max_supply;
        this.circulating_supply = data.circulating_supply;
        this.total_supply = data.total_supply;
        this.infinite_supply = data.infinite_supply;
        this.platform = data.platform;
        this.cmc_rank = data.cmc_rank;
        this.self_reported_circulating_supply = data.self_reported_circulating_supply;
        this.self_reported_market_cap = data.self_reported_market_cap;
        this.tvl_ratio = data.tvl_ratio;
        this.last_updated = data.last_updated;
        this.quote = data.quote;
    }
}

export default Cryptocurrency;
