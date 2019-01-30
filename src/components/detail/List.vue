<template>
  <div>
    <div class="item"
      v-for="(item,i) in list"
      :key="i">
      {{item.title}}

      <detail-name :list="item.children"
        v-if="item.children"></detail-name>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailName",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped >
.item {
  padding: 0.2rem;
}
</style>
