<script>
import { computed } from "vue";

import { useCartStore } from "@/stores/cart";

import PlusIcon from"@/components/icons/common/Plus.vue";
import MinusIcon from"@/components/icons/common/Minus.vue";
import CloseIcon from"@/components/icons/common/Close.vue";

export default {
  name: "CartItem",
  props: {
    cartItem: Object
  },
  components: {
    PlusIcon,
    MinusIcon,
    CloseIcon
  },
  setup(props) {
    const cartStore = useCartStore();

    const cartItemPrice = computed(() => {
      return props.cartItem.quantity * props.cartItem.price;
    })

    const decrementValue = (id) => {
      cartStore.decrement(id);
    }

    const incrementValue = (id) => {
      cartStore.increment(id);
    }

    const deleteFromCart = (id) => {
      if (confirm('Удалить товар из корзины')) {
        cartStore.deleteFromCart(id);
      }
    }

    return {
      decrementValue,
      incrementValue,
      deleteFromCart,
      cartItemPrice
    }
  }
}
</script>

<template>
  <div
    v-if="cartItem"
    class="cart-item"
  >
    <div class="cart-item__info">
      <div class="cart-item__info-left">
        <div class="cart-item__img">
          <img :src="`./src/assets/imgs/pizza/${cartItem.img}`" alt="cart-item">
        </div>
        <div class="cart-item__info-details">
          <div class="cart-item__title">
            {{ cartItem.title }}
          </div>
          <div class="cart-item__info-features">
            {{ cartItem.doughType.type }} тесто, {{ cartItem.size.size }} см.
          </div>
        </div>
      </div>
      <div class="cart-item__btns">
        <button
          type="button"
          class="cart-item__btn"
          @click="decrementValue(cartItem.id)"
        >
          <minus-icon />
        </button>
        <div class="cart-item__quantity">
          {{ cartItem.quantity }}
        </div>
        <button
          type="button"
          class="cart-item__btn"
          @click="incrementValue(cartItem.id)"
        >
          <plus-icon />
        </button>
      </div>
      <div class="cart-item__price">
        {{ cartItemPrice }} $
      </div>
      <button
        type="button"
        class="cart-item__delete"
        @click="deleteFromCart(cartItem.id)"
      >
        <close-icon />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.cart-item {
  &__info {
    padding: 30px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid $gray-800;
    &-features {
      font-size: 18px;
      color: $gray-900;
      @media screen and (max-width: 992px) {
        font-size: 16px;
      }
    }
    &-left {
      display: flex;
      align-items: center;
      width: 40%;
      @media screen and (max-width: 586px) {
        width: 100%;
        margin-bottom: 15px;
      }
    }
    &-details {
      flex: 1 1;
    }
  }
  &__img {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  &__title {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 2px;
    @media screen and (max-width: 992px) {
      font-size: 18px;
    }
  }
  &__btns {
    width: 15%;
    display: flex;
    align-items: center;
    @media screen and (max-width: 992px) {
      width: auto;
    }
  }
  &__btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid $orange-100;
    transition: all .3s ease;
    &:hover {
      background: $orange-100;
    }
    @media screen and (max-width: 992px) {
      width: 28px;
      height: 28px;
    }
  }
  &__quantity {
    min-width: 33px;
    padding: 0 5px;
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    @media screen and (max-width: 992px) {
      font-size: 16px;
    }
  }
  &__price {
    font-weight: 700;
    font-size: 22px;
    @media screen and (max-width: 992px) {
      font-size: 18px;
    }
  }
  &__delete {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $gray-1000;
    transition: all .3s ease;
    border-radius: 50%;
    &:hover {
      transform: translateY(-3px);
    }
    @media screen and (max-width: 992px) {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
