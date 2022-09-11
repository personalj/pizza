<script>
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

import Logo from "@/components/Logo.vue";
import CartIcon from "@/components/icons/common/Cart.vue"

export default {
  name: "AppHeader",
  components: {
    Logo,
    CartIcon
  },
  setup() {
    const cartStore = useCartStore();

    const route = useRoute();

    return {
      cartStore,
      route
    }
  }
}

</script>

<template>
  <div class="app-header">
    <div class="container">
      <div class="app-header__inner">
        <logo />
        <div
          v-if="route.path !== '/cart'"
          class="app-header__cart"
        >
          <div class="app-header__cart-left">
            {{ cartStore.cartTotalCost }} $
          </div>
          <router-link to="/cart" type="button" class="app-header__cart-right">
            <cart-icon />
            <span class="app-header__cart-amount">
              {{ cartStore.cartCountItems }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.app {
  &-header {
    padding: 49px 0 27px;
    margin: 0 12px 37px;
    border-bottom: 1px solid $gray-200;
    &__inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    &__cart {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 12px 19px 13px 23px;
      color: $white-100;
      background: $orange-100;
      min-height: 50px;
      border-radius: 30px;
      margin-bottom: 10px;
      &-left {
        font-weight: 700;
        padding-right: 13px;
        border-right: 1px solid rgba(255, 255, 255, 0.25);
      }
      &-right {
        display: flex;
        align-items: center;
        padding-left: 13px;
      }
      &-amount {
        font-weight: 700;
        margin-left: 8px;
        color: $white-100;
      }
    }
  }
}
</style>
