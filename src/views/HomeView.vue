<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { useProductsStore } from "../stores/products";

import ProductsItem from "@/components/ProductsItem.vue";
import Loader from "@/components/Loader.vue";
import FiltersType from "@/components/filters/FiltersType.vue";

export default {
  name: "HomeView",
  components: {
    FiltersType,
    ProductsItem,
    Loader
  },
  setup() {
    const productsStore = useProductsStore();
    const isLoading = ref(false);
    const productType = ref('all');

    const route = useRoute();

    const fetchProducts = async () => {
      try {
        isLoading.value = true
        await productsStore.getProducts();
      } catch(e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    }

    const productsList = computed(() => productsStore.productsList)

    const filteredProductList = computed(() => {
      if (productType.value === "all") return productsList.value;
      const filteredList = [];
      productsList.value.forEach(item => {
        if (item.type.includes(productType.value )) {
          filteredList.push(item);
        }
      })
      return filteredList;
    })

    const changeFilterType = (value) => {
      isLoading.value = true;
      productType.value = value;
      setTimeout(() => {
        isLoading.value = false;
      }, 500)
    }

    onMounted(async () => {
      if (!productsStore.productsList.length) {
        await fetchProducts();
      }
      if (route.query.type) {
        productType.value = route.query.type;
      }
    })

    return {
      productsStore,
      isLoading,
      productType,
      fetchProducts,
      changeFilterType,
      productsList,
      filteredProductList
    }
  }
}
</script>

<template>
  <main class="content">
    <div class="container">
      <filters-type
        :product-type="productType"
        @change-filter-type="changeFilterType"
      />
      <h2 class="content__title">
        Все пиццы
      </h2>
      <loader
        v-if="isLoading"
        :repeat="4"
      />
      <div
        v-if="filteredProductList.length && !isLoading"
        class="content__list"
      >
        <products-item
          v-for="product in filteredProductList"
          :key="product.id"
          :product="product"
        />
      </div>
      <div
        v-if="!filteredProductList.length && !isLoading"
        class="content__notice"
      >
        Нет доступных пицц
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.content {
  &__title {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 30px;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -17px;
  }
  &__notice {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    padding-bottom: 40px;
  }
}
</style>
