import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import  productPage from '~/store/productPage'

let exampleStore: productPage

function initialiseStores(store: Store<any>): void {
  exampleStore = getModule(productPage, store)
}

export { initialiseStores, exampleStore }
