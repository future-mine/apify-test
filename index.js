const { Fetcher } = require("./fetcher");
const run = async () => {
  const fetcher = new Fetcher()
  await fetcher.run('https://api.ecommerce.com/products')
}
run();