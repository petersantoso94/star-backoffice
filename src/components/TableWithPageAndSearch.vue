<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"
        >{{ $t("PerPage") }}:
        <el-select v-model="itemPerPage" placeholder="10" size="mini">
          <el-option
            v-for="(numPage, idx) in itemPerPageArr"
            :key="idx"
            :label="numPage"
            :value="numPage"
          ></el-option>
        </el-select>
        {{ $t("Row") }}</el-col
      >
      <el-col :span="6">
        <el-row>
          <el-col
            :span="columnToSearch && columnToSearch.length > 0 ? 12 : 24"
            v-if="exportExcel"
          >
            <el-button
              style="float:right"
              type="primary"
              icon="el-icon-document"
              size="mini"
              @click="exportExcel"
              >{{ $t("ExportExcel") }}</el-button
            >
          </el-col>
          <el-col
            :span="exportExcel ? 12 : 24"
            v-if="columnToSearch && columnToSearch.length > 0"
          >
            <el-input
              style="float:right"
              v-model="search"
              size="mini"
              placeholder="Type to search"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="dataTable" style="width: 100%;">
      <slot name="column"></slot>
    </el-table>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :total="data.length"
          :page-size.sync="itemPerPage"
          :hide-on-single-page="true"
        >
        </el-pagination>
      </el-col>
      <el-col :span="6" v-if="data.length > 0">
        {{
          beginningIndex + " - " + endIndex + " of " + data.length + " items"
        }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["data", "columnToSearch", "exportExcel"],
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
    },
    beginningIndex() {
      return (this.currentPage - 1) * this.itemPerPage + 1;
    },
    endIndex() {
      const endIdx = this.beginningIndex + this.itemPerPage - 1;
      return this.data.length >= endIdx ? endIdx : this.data.length;
    }
  }
};
</script>

<style>
.el-table td,
.el-table th {
  border-bottom: 1px solid #ddd !important;
}
</style>
