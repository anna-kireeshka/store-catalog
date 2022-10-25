<template>
  <input
    :id="id"
    :type="type"
    :value="innerValue"
    @input="updateInput"
    class="form-input"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({})
export default class ProductSearchForm extends Vue {
  @Prop({type: Number, default: 0,}) id?: number;

  @Prop ({type: String,  default: "text",}) type?: string;

  @Prop ({type: String, default: ""}) innerValue?: string;

  updateInput(event: { target: HTMLInputElement}) {
    this.$emit("updateInput", event.target.value);
  }
}
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 14px;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
}
::placeholder {
  font-size: 1.3rem;
}
</style>
