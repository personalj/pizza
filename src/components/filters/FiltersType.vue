<script>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

export default {
  name: "FiltersType",
  props: {
    productType: {
      type: String,
      required: false,
      default: 'all'
    }
  },

  setup(props, {emit}) {
    const router = useRouter();
    const route = useRoute();

    const typeFilters = ref([
      { id: 1, type: "all", title: "Все" },
      { id: 2, type: "meat", title: "Мясные" },
      { id: 3, type: "vegetarian", title: "Вегетарианская" },
      { id: 4, type: "grill", title: "Гриль" },
      { id: 5, type: "spicy", title: "Острые" },
      { id: 6, type: "closed", title: "Закрытые" },
    ]);

    const updateQuery = (query) => {
      router.push({
        query: {
          ...route.query,
          type: query
        },
      })
    }

    const chooseTypeFilters = (value) => {
      emit('changeFilterType', value);
      if (value === 'all') {
        if (!route.query.type) return;
        updateQuery(undefined);
        return;
      }
      updateQuery(value);
    }

    return {
      typeFilters,
      chooseTypeFilters,
      updateQuery
    }
  }
}
</script>

<template>
  <div class="filters">
    <button
      type="button"
      v-for="filter in typeFilters"
      :key="filter.id"
      class="filters__item"
      :class="{'active': productType === filter.type}"
      @click="chooseTypeFilters(filter.type)"
    >
      {{ filter.title }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 25px;
  &__item {
    padding: 10px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    min-height: 46px;
    background: $gray-100;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 30px;
    transition: all .3s ease;
    &:hover, &.active {
      color: $white-100;
      background: $black-200;
    }
  }
}
</style>
