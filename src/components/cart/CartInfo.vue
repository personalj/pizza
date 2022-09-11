<script>
import { useCartStore } from "@/stores/cart";

import CartItem from "@/components/cart/CartItem.vue";
import CartBigIcon from "@/components/icons/common/CartBig.vue";
import BucketIcon from "@/components/icons/common/Bucket.vue";
import ArrowIcon  from "@/components/icons/common/Arrow.vue";

export default {
  name: "CartInfo",
  components: {
    CartBigIcon,
    BucketIcon,
    ArrowIcon,
    CartItem
  },
  setup() {
    const cartStore = useCartStore();

    const clearCart = () => {
      if (confirm('Удалить все товары из корзины')) {
        cartStore.clearCart();
      }
    }

    return {
      cartStore,
      clearCart
    }
  }
}
</script>

<template>
  <div class="cart">
    <div class="container">
      <div class="cart__inner">
        <div class="cart__header">
          <div class="cart__header-left">
            <cart-big-icon />
            <div class="cart__header-left-title">
              Корзина
            </div>
          </div>
          <button
            type="button"
            class="cart__header-btn"
            @click="clearCart"
          >
            <bucket-icon />
            <span class="cart__header-btn-title">Очистить корзину</span>
          </button>
        </div>
        <div class="cart__info">
          <div class="cart__info-inner">
            <cart-item
              v-for="item in cartStore.cartList"
              :key="item.id"
              :cart-item="item"
            />
          </div>
        </div>
        <div class="cart__bottom">
          <div class="cart__bottom-info">
            <div class="cart__bottom-info-left">
              Всего пицц:
              <span>{{ cartStore.cartCountItems }} шт.</span>
            </div>
            <div class="cart__bottom-info-right">
              Сумма заказа:
              <span>{{ cartStore.cartTotalCost }} $</span>
            </div>
          </div>
          <div class="cart__bottom-btns">
            <router-link to="/" class="cart__bottom-btn blank">
              <arrow-icon />
              <span class="cart__bottom-btn-title">Вернуться назад</span>
            </router-link>
            <button type="button" class="cart__bottom-btn">
              <span class="cart__bottom-btn-title">Оплатить сейчас</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.cart {
  padding: 67px 0 127px;
  @media screen and (max-width: 992px) {
    padding: 50px 0;
  }
  &__info {
    overflow: hidden;
    overflow-x: auto;
    &-inner {
      width: 825px;
      @media screen and (max-width: 586px) {
        width: auto;
      }
    }
  }
  &__inner {
    max-width: 825px;
    margin: 0 auto;
  }
  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px;
    &-left {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &-title {
        margin-left: 17px;
        font-weight: 700;
        font-size: 32px;
      }
    }
    &-btn {
      transition: all .3s ease;
      margin-bottom: 15px;
      &:hover {
        transform: translateY(-3px);
      }
      &-title {
        margin-left: 7px;
        color: $gray-600;
      }
    }
  }
  &__bottom {
    &-info {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      &-left {
        font-size: 22px;
        margin-bottom: 10px;
        span {
          font-weight: 700;
        }
      }
      &-right {
        font-size: 22px;
        margin-bottom: 10px;
        span {
          font-weight: 700;
          color: $orange-100;
        }
      }
    }
    &-btns {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      font-weight: 700;
      text-align: center;
      min-height: 55px;
      min-width: 211px;
      margin-bottom: 10px;
      background: $orange-100;
      color: $white-100;
      border-radius: 30px;
      transition: all .3s ease;
      &:hover:not(.blank) {
        transform: translateY(-3px);
      }
      &.blank {
        background: transparent;
        color: $gray-700;
        border: 1px solid $gray-700;
        &:hover {
          background: $black-100;
          color: $white-100;
        }
        .cart__bottom-btn-title {
          font-weight: 400;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
