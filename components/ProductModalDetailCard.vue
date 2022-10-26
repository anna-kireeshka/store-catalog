<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal-container">
          <button class="modal-container__btn" @click="closeModal">
            <span class="material-symbols-outlined modal-header__close-icon">
              close
            </span>
          </button>
        <div class="modal-body">
            <div v-for="item in [productDetailInfo]" :key="item.id" class="detail">
              <div class="photo-container">
              <div class="detail__image-container">
                <img :src="item.image" alt="Избражение товара" class="detail__image"/>
              </div>
              </div>
              <div class="product-info">
                <p class="product-info__title"> {{ item.title }} </p>
                <p class="product-info__desc"> {{ item.description }} </p>
                <div class="price-wrap">
                  <p class="price-wrap__title">Цена:</p>
                  <p class="price-wrap__count">{{ item.price }}$</p>
                </div>
                <div class="rating">
                  <p class="rating__count"> Уже заказало: <span class="rating__count--value"> {{item.rating?.count}} </span> </p>
                  <p class="rating__rate"> Рейтинг: <span class="rating__count--value"> {{ item.rating?.rate }} </span> </p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { exampleStore } from '~/store'
import { ProductDetailModel } from '~/store/types'

@Component({})
export default class ProductModalComponent extends Vue {
  @Prop({ type: Boolean, default: false }) isShowDetail?: boolean

  @Prop({ type: Number }) productId!: number

  async created() {
    await exampleStore.getProductDetail(this.productId)
  }

  closeModal(e: boolean) {
    this.$emit('closeModal', e)
  }

  get productDetailInfo(): ProductDetailModel[] {
    return exampleStore.productDetail
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
}
.modal-container {
  @media screen and (max-width: 1280px) {
    height: auto;
  }
  @media screen and (max-width: 712px) {
    min-width: 80%;
    height: auto;
  }

  display: flex;
  background: #fff;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  width: 50%;
  height: 700px;
  overflow-y: auto;
  flex-direction: column;
  padding: 20px;

  &__btn {
    @media screen and (max-width: 512px) {
      padding: 3px;
      top: 2%;
      left: 2%;
    }
    position: absolute;
    padding: 10px;
    top: 2%;
    @include default-btn;
  }
}
.detail {
  display: flex;
  &__image-container {
    width: 100%;
    height: 100%;
  }
  &__image {
    width: 80%;
    display: block;
    margin: 0 auto;
  }
}
.product-info {
  width: 50%;
  &__title {
    @include title-style;
    margin-bottom: 30px;
  }
  &__desc {
    @media screen and (max-width: 512px) {
      height: 100px;
      overflow-y: scroll;
    }
    @include description-style;
    margin-bottom: 30px;
  }
}
.photo-container {
  width: 50%;
}
.price-wrap {
  width: 100px;
  @include price;
  margin-bottom: 30px;
}
.rating {
  display: flex;
  @media screen and (max-width: 512px) {
    display: block;
  }
  &__count {
    @media screen and (max-width: 512px) {
      font-size: 15px;
      margin-right: 0;
    }
    @include description-style;
    margin-right: 30px;
    &--value {
      font-weight: 700;
      color: #357cff;
    }
  }
  &__rate {
    @include description-style;
    @media screen and (max-width: 512px) {
      font-size: 15px;
      margin-right: 0;
    }
    &--value {
      font-weight: 700;
      color: #357cff;
    }
  }
}
</style>
