import type { Customer } from 'src/models/customer'
import { GetApi } from 'src/utils/requests'

class CustomersApi {
  async getCustomers(): Promise<Customer[]> {

    const r = (await GetApi('/orders/bestCustomers')).data;

    return Promise.resolve(r);
  }

}

export const customersApi = new CustomersApi();
