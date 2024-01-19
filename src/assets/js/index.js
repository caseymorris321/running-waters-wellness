
const delayedDataFetch = () =>
  new Promise((resolve) => setTimeout(() => resolve([1, 2, 3]), 2000));

const CACHE_EXPIRATION_TIME_MS = 5000;

class SomeServiceWithDataCache {
  constructor() {
    this.cache = {
      isLoading: false,
      expire: 0,
      data: null
    };
    this.cacheSubscriptions = [];
  }

  async getData(sequenceId) {
    if (this.cache.expire < new Date().getTime() && !this.cache.isLoading) {
      this.cache.isLoading = true;

      this.cache = {
        isLoading: false,
        data: await delayedDataFetch(),
        expire: new Date().getTime() + CACHE_EXPIRATION_TIME_MS
      };

      await Promise.all(
        this.cacheSubscriptions.map((res) => res(this.cache.data))
      ).then(() => (this.cacheSubscriptions = []));
    }

    if (this.cache.isLoading) {
      return new Promise((resolve) => this.cacheSubscriptions.push(resolve));
    }

    return this.cache.data;
  }
}

async function main() {
  const service = new SomeServiceWithDataCache();

  await Promise.all([service.getData(1), service.getData(2)]).then(
    ([res1, res2]) => {
      // switch isLoading to true, performs loading

    }
  );

  await service
    .getData(3)
    // should receive loaded data from service cache

}

main().then();

const a = [1, 2, 3];
a[6] = 9;
