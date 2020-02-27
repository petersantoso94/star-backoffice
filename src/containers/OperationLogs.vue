<template>
  <div>
    {{ $t("Inquire") }}<br />
    <el-form
      :inline="true"
      :model="searchForm"
      class="demo-form-inline"
      style="margin-top:20px"
      size="mini"
    >
      <el-form-item :label="$t('AccountNumber') + ':'">
        <el-input v-model="searchForm.account" />
      </el-form-item>
      <el-form-item :label="'*' + $t('Time') + ':'"
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
        <el-table-column
          :label="$t('SerialNumber')"
          prop="id"
        ></el-table-column>
        <el-table-column :label="$t('BackOfficeAccount')" prop="account">
        </el-table-column>
        <el-table-column :label="$t('Actions')" prop="action">
        </el-table-column>
        <el-table-column label="IP" prop="ip"> </el-table-column>
        <el-table-column :label="$t('Time')" prop="time"> </el-table-column>
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
