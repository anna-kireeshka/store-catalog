import {
  Mutation,
  Action,
  VuexModule,
  Module
} from "vuex-module-decorators";
import {ProductDetailModel, ProductListModel} from './types';
import { $axios } from '~/utils/api'
import axios from 'axios'

const baseUrl = `https://fakestoreapi.com`;

@Module({
  stateFactory: true,
  name: 'productPage',
  namespaced: true,
})

export default class ProductModule extends VuexModule {
  products: ProductListModel[] = []
  productDetail: ProductDetailModel[] = [];
  categories: string[] = [];
  innerValue: string = '';
  page: number = 0;
  pageSize: number = 0;

  get searchValue() {
    return this.products?.filter((el) => el.title.toLowerCase().includes(this.innerValue.toLowerCase()))
  }

  @Mutation
  setProductList(products: ProductListModel[]) {
    this.products = products
  };

  @Mutation
  setProductDatail(product: ProductDetailModel[]) {
    this.productDetail = product;
  }

  @Mutation
  setCategoriesList(categories: string[]) {
    this.categories = categories;
  }

  @Mutation
  setFilteredList(products: ProductListModel[]) {
    this.products = products;
  }

  @Mutation
  searchProductValue(value: string) {
   this.innerValue = value;
  }

  @Action
  public async getProducts() {
    try {
      const response = await axios.get(`${baseUrl}/products`)
      this.setProductList(response.data)
    } catch (err) {
      alert('Ошибка сервиса, каталог не загрузился')
    }
  };

  @Action
  public async getProductDetail(idProduct: number) {
    try {
      const response = await axios.get(`${baseUrl}/products/${idProduct}`);
      this.setProductDatail(response.data)
    } catch (err) {
      alert('Ошибка сервиса, информация о продукте не загрузилась')
    }
  };

  @Action
  public async getCategories() {
    try {
      const response = await axios.get(`${baseUrl}/products/categories`);
      this.setCategoriesList(response.data);
    } catch (err) {
      alert('Ошибка сервиса, информация о категориях не загрузилась')
    }
  }

  @Action
  public async getProductListForCategories(category: string) {
    try {
      const response = await axios.get(`${baseUrl}/products/category/${category}`);
      this.setFilteredList(response.data)
    } catch (err) {
      alert('Ошибка сервиса, каталог не загрузился')
    }
  }
};


