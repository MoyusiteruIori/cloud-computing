import type { CategoryStatistics, YearStatistics } from 'src/models/statistics'
import { GetApi } from 'src/utils/requests'

class StatisticsApi {
  async getStatByCategory(): Promise<CategoryStatistics[]> {

    const r = (await GetApi('/orders/categoryStatistics')).data;

    return Promise.resolve(r);
  }

  async getStatByYear(): Promise<YearStatistics[]> {

    const r = (await GetApi('/orders/yearlyStatistics')).data;

    return Promise.resolve(r);
  }

}

export const statisticsApi = new StatisticsApi();
