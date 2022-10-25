<template>
  <div class="wrapper">
    <nav class="navigation">
      <div class="navigation__wrap">
        <ProductSearchForm
          :value="innerValue"
          :placeholder="'Найти...'"
          class="navigation__search-form"
          @updateInput="search($event)"
        />
        <div class="navigation__btn-container">
          <button
            title="Список"
            class="navigation__btn"
            @click="displayAslistOrGrid('list')"
          >
            <span class="material-symbols-outlined"> reorder </span>
          </button>
          <button
            title="Сетка"
            class="navigation__btn"
            @click="displayAslistOrGrid('grid')"
          >
            <span class="material-symbols-outlined"> grid_on </span>
          </button>
        </div>
      </div>
    </nav>

    <ProductPageCategoryList
      :categories-list="categoriesList"
    ></ProductPageCategoryList>

    <div class="products">
      <ProductListComponent
        :product-list="filteredProductList"
        :is-list="isDisplayAsList"
        :is-grid="isDisplayAsGrid"
      />
    </div>

    <div class="pagination">
      <ProductPagination
        :total-pages="3"
        :total="113"
        :current-page="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ProductListModel } from '~/store/types'
import { exampleStore } from '~/store'
import ProductSearchForm from '~/components/ProductSearchForm.vue'
import ProductListComponent from '~/components/ProductListComponent.vue'
import ProductPageCategoryList from '~/components/ProductPageCategoryList.vue'
import ProductPagination from '~/components/ProductPagination.vue'

export type PageDisplay = 'grid' | 'list'

@Component({
  components: {
    ProductSearchForm,
    ProductListComponent,
    ProductPageCategoryList,
    ProductPagination,
  },
})
export default class ProductPage extends Vue {
  product: ProductListModel[] = []

  isOpenProductDetail: boolean = false

  isDisplayAsList: boolean = false

  isDisplayAsGrid: boolean = false

  categoryName: string = ''

  currentPage: number = 1

  pageSize: number = 4

  async created() {
    await exampleStore.getProducts()
    await exampleStore.getCategories()
  }

  get filteredProductList(): ProductListModel[] {
    if (this.innerValue.length) {
      this.product = exampleStore.searchValue
    } else {
      this.product = exampleStore.products
    }
    return this.product
  }

  get categoriesList(): string[] {
    return exampleStore.categories
  }

  get innerValue(): string {
    return exampleStore.innerValue
  }

  displayAslistOrGrid(display: PageDisplay) {
    if (display === 'list') {
      this.isDisplayAsList = true
      this.isDisplayAsGrid = false
    } else {
      this.isDisplayAsGrid = true
      this.isDisplayAsList = false
    }
  }

  search(value: string) {
    exampleStore.searchProductValue(value)
  }

  onPageChange(page: number) {
    this.currentPage = page
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.navigation {
  width: 100%;
  &__wrap {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px auto;

    padding: 20px 30px;
    background: #b0d9ff;
    border-radius: 20px;
  }
  &__btn-container {
    display: flex;
  }
  &__btn {
    @include default-btn;
    background: #fff;
    padding: 10px;
    margin-right: 10px;
    &:hover {
      border-bottom: 2px solid #072743;
    }
  }
  &__search-form {
    width: 50%;
  }
}
.category {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 70%;
  &__item {
    padding: 20px 45px;
    background: #afdaff;
    border: none;
    border-radius: 33px;
    color: #072743;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    &:hover,
    &:focus {
      border-bottom: 2px solid #072743;
    }
  }
}
.pagination {
  margin: 40px auto;
}
</style>
