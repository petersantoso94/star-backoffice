<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <strong>查詢</strong><br />
      <el-form-item label="帳號:" size="mini">
        <el-input v-model="searchForm.name" />
      </el-form-item>

      <el-form-item size="mini">
        <el-button @click="onSubmit" icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <el-button size="mini" @click="showDialogHandler">新增</el-button><br />
    <TableWithPageAndSearch
      :data="data"
      :exportExcel="exportExcelHandler"
      style="margin-top:20px"
    >
      <template slot="column"
        ><el-table-column label="編號" prop="id"> </el-table-column>
        <el-table-column label="後台帳號" prop="account"> </el-table-column>
        <el-table-column label="商戶" prop="merchant"> </el-table-column>
        <el-table-column label="狀態" prop="status"
          ><template slot-scope="scope">
            {{ scope.row.status ? "開" : "關" }}
          </template>
        </el-table-column>
        <el-table-column label="群組" prop="group"> </el-table-column>
        <el-table-column label="建立時間" prop="setUpTime"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit-outline"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </template> </el-table-column
      ></template>
    </TableWithPageAndSearch>
    <NewAccountDialog
      v-if="showNewMerchantDialog"
      :add="add"
      :formEditMerchant="selectedMerchant"
      :showDialog="showNewMerchantDialog"
      :closeDialog="
        () => {
          showNewMerchantDialog = false;
        }
      "
      @close-dialog="showNewMerchantDialog = false"
      :submitForm="submitAddForm"
    />
  </div>
</template>

<script>
import { Message } from "element-ui";
import EventBus from "@/utilities/event-bus";
import NewAccountDialog from "@/components/NewAccountDialog.vue";
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
export default {
  components: { NewAccountDialog, TableWithPageAndSearch },
  data: () => ({
    showNewMerchantDialog: false,
    add: true,
    searchForm: { name: "" },
    selectedMerchant: {},
    data: [],
    columnToSearch: ["name"]
  }),
  methods: {
    onSubmit() {
      console.log(this.searchForm);
    },
    submitAddForm(form) {
      console.log(form);
      this.showNewMerchantDialog = false;
      Message.success({
        message: "Succesfully " + (this.add ? "added" : "editted"),
        type: "success"
      });
    },
    handleEdit(idx, row) {
      console.log(row, idx);
      this.selectedMerchant = row;
      this.add = false;
      this.showNewMerchantDialog = true;
    },
    showDialogHandler() {
      this.add = true;
      this.showNewMerchantDialog = true;
    },
    exportExcelHandler() {
      console.log("exporting excel...");
    }
  },
  mounted() {
    const statusArr = [true, false];
    for (let i = 0; i < 50; i++) {
      this.data.push({
        account: `Alisa${i}`,
        id: i,
        status: statusArr[i % 2],
        merchant: "ALL",
        group: "管理員",
        setUpTime: "2019-08-05 10:19:01"
      });
    }
    EventBus.$on("close-dialog", () => {
      this.showNewMerchantDialog = false;
    });
  }
};
</script>

<style></style>
