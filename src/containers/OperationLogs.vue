<template>
  <div>
    查詢<br />
    <el-form
      :inline="true"
      :model="searchForm"
      class="demo-form-inline"
      style="margin-top:20px"
      size="mini"
    >
      <el-form-item label="帳號:">
        <el-input v-model="searchForm.account" />
      </el-form-item>
      <el-form-item label="*轉入時間:"
        ><el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          range-separator="~"
          start-placeholder="Start date"
          end-placeholder="End date"
        >
        </el-date-picker
      ></el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <TableWithPageAndSearch
      :data="data"
      :exportExcel="exportExcelHandler"
      style="margin-top:20px"
    >
      <template slot="column">
        <el-table-column label="流水號" prop="id"></el-table-column>
        <el-table-column label="後台帳號" prop="account"> </el-table-column>
        <el-table-column label="動作" prop="action"> </el-table-column>
        <el-table-column label="IP" prop="ip"> </el-table-column>
        <el-table-column label="時間" prop="time"> </el-table-column>
      </template>
    </TableWithPageAndSearch>
  </div>
</template>

<script>
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
export default {
  components: {
    TableWithPageAndSearch
  },
  data: () => ({
    searchForm: { account: "", date: [] },
    data: []
  }),
  methods: {
    onSubmit() {
      console.log(this.searchForm);
    },
    exportExcelHandler() {
      console.log("exporting excel...");
    }
  },
  mounted() {
    for (let i = 0; i < 50; i++) {
      this.data.push({
        id: i,
        account: "alisa",
        action: `Z${i} 人工扣除 10473006`,
        ip: `59.124.24.214`,
        time: `2019-07-29 00:29:35`
      });
    }
  }
};
</script>

<style></style>
