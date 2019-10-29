<template>
  <div>
    <p>{{value}}</p>
    <SearchInput
      :list="list"
      @inputChange="inputChange"
      @select="select"
    />
  </div>
</template>

<script>
import SearchInput from "../components/searchInput";

export default {
  name: "Hello",
  components: {
    SearchInput
  },
  data() {
    return {
      list: [],
      value: ""
    };
  },
  methods: {
    inputChange(val) {
      // 查询
      console.log(val);
      this.list = [
        {
          label: "a",
          value: "a"
        },
        {
          label: "b",
          value: "b"
        },
        {
          label: "c",
          value: "c"
        }
      ];
    },
    select(obj) {
      console.log(obj);
      this.value = obj.value;
    }
  }
};
</script>
