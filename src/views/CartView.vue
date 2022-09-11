<script>
import { computed } from "vue";

import { useCartStore } from "../stores/cart";
import CartEmpty from "@/components/cart/CartEmpty.vue";
import CartInfo from "@/components/cart/CartInfo.vue";

export default {
  name: "CartView",
  components: {
    CartEmpty
  },
  setup() {
    const cartStore  = useCartStore();

    const cartComponent = computed(() => {
      if (!cartStore.cartList.length) return CartEmpty;
      return CartInfo;
    })

    return {
      cartStore,
      cartComponent
    }
  }
}
</script>

<template>
  <div>
    <component :is="cartComponent" />
  </div>
</template>
