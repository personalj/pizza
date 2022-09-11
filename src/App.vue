<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === 'main') return MainLayout
  return EmptyLayout
})
</script>

<template>
  <div class="app-main">
    <component :is="layout" />
  </div>
</template>
