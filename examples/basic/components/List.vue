<template>
  <ul class="list">
    <li v-for="(item, index) in items" :key="index">
      {{ item.key }} : {{ item.val }}
    </li>
  </ul>
</template>

<script>
    export default {
        name: "List",
        props: {
            items: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style>
  .list {
    font-size: 12px;
    color: #000;
    list-style: none;
  }
  .list > li {
    line-height: 22px;
    border-bottom: solid 1px #ccc;
  }
</style>