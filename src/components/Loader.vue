<script >
export default {
  name: "Loader",
  props: {
    repeat: {
      type: Number,
      default: 1
    }
  }
}
</script>
<template>
  <div class="card-wrap">
    <div
      v-for="i in repeat"
      :key="i"
      class="card is-loading"
    >
      <div class="image" />
      <div class="content">
        <div class="title" />
        <div class="desc" />
        <div class="info" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/vars";
.card {
  padding: 0 17px;
  flex-basis: 25%;
  margin-bottom: 65px;
  @media screen and (max-width: 1100px) {
    flex-basis: 50%;
  }
  @media screen and (max-width: 586px) {
    flex-basis: 100%;
  }
  &-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -17px;
  }
  &.is-loading {
    .image,
    .desc,
    .title,
    .info {
      background: $gray-400;
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      border-radius: 5px;
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
    }
    .image {
      width: 100%;
      height: 200px;
      max-width: 200px;
      border-radius: 50%;
      margin: 0 auto 25px;
    }
    .title {
      margin-bottom: 22px;
    }
    .title {
      height: 24px;
    }
    .info {
      height: 40px;
    }
    .desc {
      height: 85px;
      margin-bottom: 17px;
    }
  }
}
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
