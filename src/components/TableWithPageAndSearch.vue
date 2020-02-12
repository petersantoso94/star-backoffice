<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"
        >每頁:
        <el-select v-model="itemPerPage" placeholder="10" size="mini">
          <el-option
            v-for="(numPage, idx) in itemPerPageArr"
            :key="idx"
            :label="numPage"
            :value="numPage"
          ></el-option>
        </el-select>
        筆</el-col
      >
      <el-col :span="6">
        <el-input
          style="float:right"
          v-model="search"
          size="mini"
          placeholder="Type to search"
        />
      </el-col>
    </el-row>
    <el-table :data="dataTable" style="width: 100%;">
      <slot name="column"></slot>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :total="data.length"
      :page-size.sync="itemPerPage"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["data", "columnToSearch"],
  data: () => ({
    search: "",
    itemPerPage: 10,
    currentPage: 1,
    itemPerPageArr: [10, 50, 100]
  }),
  methods: {
    searchHandler(data) {
      for (let i = 0; i < this.columnToSearch.length; i++) {
        const el = this.columnToSearch[i];
        if ((data[el] + "").toLowerCase().includes(this.search.toLowerCase()))
          return true;
      }
      return false;
    }
  },
  computed: {
    dataTable() {
      const tempData = [...this.data];

      return tempData
        .filter(data => !this.search || this.searchHandler(data))
        .splice((this.currentPage - 1) * this.itemPerPage, this.itemPerPage);
    }
  }
};
</script>

<style></style>
