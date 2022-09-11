<template>
  <router-link to="/" class="logo">
    <div class="logo__left">
      <img src="@/assets/imgs/logo.png" alt="logo">
    </div>
    <div class="logo__right">
      <h1 class="logo__right-top">
        VUE PIZZA
      </h1>
      <div class="logo__right-bottom">
        самая вкусная пицца во вселенной
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    max-width: 38px;
    max-height: 38px;
  }
  &__left {
    margin-right: 17px;
  }
  &__right {
    &-top {
      font-weight: 800;
      font-size: 24px;
      color: $black-300;
    }
    &-bottom {
      color: $gray-300;
    }
  }
}
</style>
