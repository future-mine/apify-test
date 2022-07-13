const axios = require("axios");
class Fetcher {
  constructor() {
    this.api = axios.create();
  }
  objectToQueryString(params = {}) {
    return Object.keys(params)
      .map((key) => {
        return `${key}=${params[key]}`;
      })
      .join("&");
  }
  async get(url, params) {
    url = `${url}?${this.objectToQueryString(params)}`;
    const response = await this.api.get(url);
    return response.data;
  }
  async run(url) {
    const max = 10000;
    let minPrice = 0;
    let maxPrice = 100;
    let products = [];
    while (true) {
      const data = await this.get(url, { minPrice, maxPrice });
      const total = data.total;
      const count = data.count;
      if (count == total) {
        products.push(data.products);
        const diff = maxPrice - minPrice;
        minPrice = maxPrice;
        maxPrice = minPrice + diff / 0.9;
        if (maxPrice > max) {
          maxPrice = max;
        } else if (maxPrice === max) {
          return products;
        }
      } else {
        maxPrice = minPrice + (((maxPrice - minPrice) * count) / total) * 0.9;
      }
    }
  }
}
module.exports = {
  Fetcher
}
