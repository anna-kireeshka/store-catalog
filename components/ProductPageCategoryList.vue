<template>
  <div class="category">
    <div
      v-for="(item, index) in categoriesList"
      :key="index"
      class="category__list"
    >
      <button
        title="Категория"
        class="category__item"
        @click="searchForCategory(item)"
      >
        {{ item }}
      </button>
    </div>
    <button
      title="Категория"
      class="category__item"
      @click="searchForCategory('all')"
    > All products </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { exampleStore } from '~/store'

@Component({})
export default class ProductPageCategoryList extends Vue {
 @Prop({type: Array as () => Array<string>, default: []}) categoriesList?: [];

  async searchForCategory(category: string | 'all') {
    if (category === 'all') {
      await exampleStore.getProducts();
    } else {
      await exampleStore.getProductListForCategories(category);
    }
  }
}

</script>

<style scoped lang="scss">
.category {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 70%;
  &__item {
    @include default-btn;
    padding: 20px 45px;
    text-transform: uppercase;
    font-weight: 600;
    &:hover,
    &:focus {
      border-bottom: 2px solid #072743;
    }
  }

}
</style>
