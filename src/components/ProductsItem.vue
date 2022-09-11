<script>
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "@/stores/cart";

import PlusIcon from "@/components/icons/common/Plus.vue"

export default {
  name: "ProductsItem",
  props: {
    product: Object
  },
  components: {
    PlusIcon
  },
  setup(props) {
    const doughType = ref('');
    const doughTypeId = ref(null);
    const sizeType = ref('');
    const sizeId = ref(null);
    const sizePrice = ref(0);
    const productQuantity = ref(1);

    const cartStore = useCartStore();

    const chooseDoughType = (feature) => {
      if (!feature.isAvailable) return false;
      [doughTypeId.value, doughType.value ] = [feature.id, feature.type]
    }

    const chooseSize = (size) => {
      if (!size.isAvailable) return false;
      [sizeId.value, sizeType.value, sizePrice.value] = [size.id, size.size, size.price];
    }

    const setToCart = (product) => {
      let item = product;
      const { id, img, title, price } = item;
      item = {
        id: id + sizeType.value + doughTypeId.value,
        img,
        title,
        price,
        doughType: {
          id: doughTypeId,
          type: doughType.value
        },
        size: {
          id: sizeId.value,
          price: sizePrice.value,
          size: sizeType.value
        },
        productId: product.id,
        quantity: +productQuantity.value,
      };
      cartStore.setToCart(item);
    }

    const cartItemQuantity = computed(() => {
      const productCart = cartStore.cartList.length && cartStore.cartList.filter(item => item.productId === props.product.id);
      return productCart && productCart.reduce((ac, next) => {
        if (next.quantity) {
          return ac + next.quantity
        }
        return 0
      },  0);
    })

    onMounted(() => {
      const doughTypeItem = props.product.doughTypes.find(item => item.isAvailable);
      doughTypeId.value = doughTypeItem.id;
      doughType.value = doughTypeItem.type;

      const sizeItem = props.product.sizes.find(item => item.isAvailable);
      sizeId.value = sizeItem.id;
      sizeType.value = sizeItem.size;
      sizePrice.value = sizeItem.price;
    })

    return {
      doughType,
      doughTypeId,
      sizeType,
      sizeId,
      sizePrice,
      chooseDoughType,
      chooseSize,
      cartStore,
      setToCart,
      cartItemQuantity
    }
  }
}
</script>

<template>
  <div
    v-if="product"
    class="product"
  >
    <div class="product__img">
      <img :src="`./src/assets/imgs/pizza/${product.img}`" alt="product-image">
    </div>
    <h4 class="product__title">
      {{ product.title }}
    </h4>
    <div class="product__info">
      <div class="product__info-features">
        <ul
          v-for="feature in product.doughTypes"
          :key="feature.id"
          class="product__info-feature"
        >
          <li
            :class="{'active': doughType === feature.type, 'disabled': !feature.isAvailable}"
            class="product__info-feature-param"
            @click="chooseDoughType(feature)"
          >
            {{ feature.type }}
          </li>
        </ul>
      </div>
      <div class="product__info-size">
        <ul
          v-for="size in product.sizes"
          :key="size.id"
          class="product__info-feature"
        >
          <li
            :class="{'active': sizeId === size.id, 'disabled': !size.isAvailable}"
            class="product__info-feature-param"
            @click="chooseSize(size)"
          >
            {{ size.size }}
          </li>
        </ul>
      </div>
    </div>
    <div class="product__bottom">
      <div class="product__price">
        от {{ product.price }} $
      </div>
      <button
        class="product__btn"
        @click="setToCart(product)"
      >
        <plus-icon />
        <span class="product__btn-text">Добавить</span>
        <span
          v-if="cartItemQuantity"
          class="product__btn-info"
        >
          {{ cartItemQuantity }}
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.product {
  padding: 0 17px;
  flex-basis: 25%;
  margin-bottom: 65px;
  @media screen and (max-width: 1100px) {
    flex-basis: 50%;
  }
  @media screen and (max-width: 586px) {
    flex-basis: 100%;
  }
  &__img {
    text-align: center;
    margin-bottom: 5px;
  }
  &__title {
    text-align: center;
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 15px;
  }
  &__info {
    padding: 7px 6px;
    background: $gray-200;
    border-radius: 10px;
    margin-bottom: 17px;
    &-size {
      display: flex;
      margin-top: 7px;
    }
    &-features {
      display: flex;
    }
    &-feature {
      width: 50%;
      &-param {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all .3s ease;
        min-height: 32px;
        &.disabled {
          cursor: default;
          background: transparent;
          opacity: 0.5;
        }
        &.active, &:hover:not(.disabled) {
          background: $white-100;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
          border-radius: 5px;
        }
      }
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__price {
    font-weight: 700;
    font-size: 22px;
  }
  &__btn {
    transition: all .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 132px;
    min-height: 40px;
    background: $white-100;
    border: 1px solid $orange-100;
    padding: 10px 14px;
    border-radius: 30px;
    &:hover {
      background: $orange-100;
      .product__btn-text {
        color: $white-100;
      }
      .product__btn-info {
        background: $white-100;
        color: $orange-100;
      }
    }
    &-text {
      transition: all .3s ease;
      font-weight: 700;
      color: $orange-100;
      margin-left: 8px;
    }
    &-info {
      min-width: 22px;
      min-height: 22px;
      font-weight: 700;
      font-size: 13px;
      color: $white-100;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      background: $orange-100;
    }
  }
}
</style>
