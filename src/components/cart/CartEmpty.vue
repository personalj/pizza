<template>
  <div class="cart-info">
    <div class="container">
      <div class="cart-info__inner">
        <h2 class="cart-info__title">
          Корзина пустая 😕
        </h2>
        <p class="cart-info__desc">
          Вероятней всего, вы не заказывали ещё пиццу.
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <div class="cart-info__img">
          <img src="@/assets/imgs/cart-empty.svg" alt="cart-empty">
        </div>
        <router-link to="/"
          type="button"
          class="cart-info__btn"
        >
          Вернуться назад
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
  .cart {
    &-info  {
      padding: 140px 0 163px;
      @media screen and (max-width: 992px) {
        padding: 50px 0;
      }
      &__inner {
        text-align: center;
        max-width: 540px;
        margin: 0 auto;
      }
      &__title {
        font-weight: 700;
        font-size: 32px;
        margin-bottom: 5px;
      }
      &__desc {
        font-size: 18px;
        line-height: 145.4%;
        color: $gray-500;
        margin-bottom: 43px;
      }
      &__img {
        margin-bottom: 74px;
      }
      &__btn {
        display: block;
        min-height: 46px;
        max-width: 210px;
        font-weight: 700;
        padding: 15px 37px;
        transition: all .3s ease;
        background: $black-100;
        color: $white-100;
        text-align: center;
        border-radius: 30px;
        margin: 0 auto;
        &:hover {
          transform: translateY(-3px);
        }
      }
    }
  }
</style>
