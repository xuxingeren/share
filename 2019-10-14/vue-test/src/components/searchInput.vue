<template>
  <div class="searchInput">
    <input
      type="text"
      @input="input"
    >
    <ul
      class="list"
      v-show="list.length > 0 && listShow"
    >
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="liClick(item)"
      >{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      listShow: false
    };
  },
  methods: {
    liClick(item) {
      this.$emit("select", item);
      this.listShow = false;
    },
    input(e) {
      this.listShow = true;
      this.$emit("inputChange", e.currentTarget.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchInput {
  display: inline-block;
  position: relative;
  > input {
    height: 32px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    &:focus {
      border-color: #3598dc;
    }
  }
  .list {
    position: absolute;
    z-index: 2;
    top: 32px;
    left: 0;
    list-style: none;
    padding: 0 10px;
    margin: 0;
    width: 100%;
  }
}
</style>