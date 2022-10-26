<template>
  <div class="products">
    <div class="products__list">
      <div
        v-for="item in productList"
        :key="item.id"
        class="products__item"
        :class="{ 'products__item-row': isList }"
      >
        <div
          class="product"
          :class="{ 'product-row': isList }"
          @click="showDetail(item.id)"
        >
          <div class="product__img-wrap">
            <img
              :src="item.image"
              alt="Изображение товара"
              class="product__img"
              :class="{ 'product-row__img': isList }"
            />
          </div>

          <div :class="{ 'info-row': isList }">
            <div class="product__info info">
              <p class="info__title">{{ item.title }}</p>
              <!--            <p class="info__description" :class="{'info-row__description': isList}"> {{ item.description }} </p>-->
            </div>
            <div class="prooduct__price price">
              <div class="price-wrap">
                <p class="price-wrap__title">Цена:</p>
                <p class="price-wrap__count">{{ item.price }}$</p>
              </div>
              <button
                title="Добавить в корзину"
                type="button"
                class="price__btn-card"
              >
                <span class="material-symbols-outlined"> shopping_cart </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductModalDetailCard
      :is-show-detail="isShowModal"
      v-if="isShowModal"
      :product-id="idProduct"
      @closeModal="isShowModal = $event.target.value"
    >
    </ProductModalDetailCard>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import ProductModalDetailCard from './ProductModalDetailCard.vue'
import { ProductListModel } from '~/store/types'

@Component({
  components: { ProductModalDetailCard },
})
export default class ProductListComponent extends Vue {
  @Prop({ type: Array as () => ProductListModel[], default: [] })
  productList?: []

  @Prop({ type: Boolean, default: false }) isList?: boolean

  @Prop({ type: Boolean, default: true }) isGrid?: boolean

  isShowModal: boolean = false

  idProduct: number = 0

  showDetail(productId: number) {
    this.isShowModal = true
    this.idProduct = productId
  }
}
</script>

<style scoped lang="scss">
.products {
  @include small-desctop;
  width: 70%;
  margin: 0 auto;
  margin-top: 80px;

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__item {
    @media screen and (min-width: 1024px) {
      flex: 1 0 25%;
      margin: 40px;
    }

    margin: 10px;
    overflow: hidden;
    background: #ffffff;
    border: 3px solid #d7e5f4;
    border-radius: 40px;
    padding: 20px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 14px 30px rgba(43, 84, 117, 0.4);
    }
  }
  &__item-row {
    flex: 0 0 100%;
    margin-bottom: 40px;
  }
}
.product {
  &__img-wrap {
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: 100%;
  }
  &__img {
    @media screen and (min-width: 1280px) {
      height: 500px;
    }
    width: 60%;
    object-fit: contain;
    margin: 0 auto;
  }
}
.product-row {
  display: flex;
  width: 100%;
  &__img {
    @media screen and (min-width: 1280px) {
      height: 400px;
    }
  }
}
.info {
  &__title {
    @include title-style;

    margin-bottom: 15px;
  }
  &__description {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    color: #357cff;
  }
}
.info-row {
  @include small-desctop;
  display: flex;
  flex-direction: column;
  width: 70%;
}
.price {
  @include price;
  &__btn-card {
    @include default-btn;
    padding: 13px;

    color: #fff;
    &:hover {
      background: #7fb3e3;
    }
  }
}
</style>
