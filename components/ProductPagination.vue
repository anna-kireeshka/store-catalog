<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInFirstPage"
        class="pagination-item__btn"
        @click="onClickPreviousPage"
      >
        Previous
      </button>
    </li>

    <li v-for="page in pages" class="pagination-item">
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.count) }"
        class="pagination-item__btn"
        @click="onClickPage(page.count)"
      >
        {{ page.count }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInLastPage"
        class="pagination-item__btn"
        @click="onClickNextPage"
      >
        Next
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ProductPagination extends Vue {
  @Prop({ type: Number, required: false, default: 3 }) maxVisibleButtons!: 3

  @Prop({ type: Number, required: true }) totalPages!: 0

  @Prop({ type: Number, required: true }) total!: 0

  @Prop({ type: Number, required: true }) currentPage!: 0


  get startPage() {
    // @ts-ignore
    if (this.currentPage === 1) {
      return 1
    }

    if (this.currentPage === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons + 1
    }

    return this.currentPage - 1
  }

  get endPage() {
    return Math.min(
      this.startPage + this.maxVisibleButtons - 1,
      this.totalPages
    )
  }

  get pages() {
    const range = []

    for (let i = this.startPage; i <= this.endPage; i += 1) {
      range.push({
        count: i,
        isDisabled: i === this.currentPage,
      })
    }
    return range
  }

  get isInFirstPage() {
    return this.currentPage <= 1
  }

  get isInLastPage() {
    return this.currentPage === this.totalPages
  }

  isPageActive(page: number) {
    return this.currentPage === page;
  }

  onClickPreviousPage() {
    if (this.currentPage > 1) {
      this.$emit('pagechanged', this.currentPage - 1);
    }
  }

  onClickPage(page: number) {
    this.$emit('pagechanged', page);
  }

  onClickNextPage() {
    this.$emit('pagechanged', this.currentPage + 1);
  }
}
</script>

<style lang="scss">
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  &__btn {
    @include default-btn;
    padding: 10px;
    border-radius: 0;
    margin-right: 10px;
    &:hover {
      border-bottom: 2px solid #072743;
    }
  }
}

.active {
  background-color: #463dbe;
  color: #ffffff;
}
</style>
