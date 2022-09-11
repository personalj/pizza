<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader
  }
}
</script>

<template>
  <div class="app-main">
    <app-header />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>
