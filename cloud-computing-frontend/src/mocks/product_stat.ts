import type { ProductStatBySex, Product, ProductOrder } from '@/models/product_stat';
import { GetApi } from 'src/utils/requests'

class ProductsApi {
  async getProductStatBySex(sex: string): Promise<ProductStatBySex[]> {
    var s: string = "";
    if (sex === "男" || sex === "1") {
        s = "1";
    }
    else {
        s = "2";
    }

    const r = (await GetApi('/orders/sexStatistics', {
        sex: s
    })).data;

    return Promise.resolve(r);
  }

  async getProductsByPriceRange(low: number, high: number): Promise<Product[]> {
    const r = (await GetApi('/product/byCostRange', {
        low,
        high
    })).data;
    return Promise.resolve(r);
  }

  async getRelatedOrdersByPName(p_name: string): Promise<ProductOrder[]> {
    const r = (await GetApi('/orders/byProductName', {
      p_name
    })).data;

    return Promise.resolve(r);
  }

}

export const productsApi = new ProductsApi();
