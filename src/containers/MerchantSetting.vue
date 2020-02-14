<template>
  <div>
    <el-button size="mini" @click="showDialogHandler">新增</el-button>
    <TableWithPageAndSearch
      style="margin-top:20px"
      :data="data"
      :columnToSearch="columnToSearch"
    >
      <template slot="column">
        <el-table-column label="商戶名稱" prop="name"> </el-table-column>
        <el-table-column label="版本號" prop="version"> </el-table-column>
        <el-table-column label="商戶開通" prop="status"
          ><template slot-scope="scope">
            {{ scope.row.status ? "開" : "關" }}
          </template>
        </el-table-column>
        <el-table-column label="商戶首頁" prop="homeUrl"> </el-table-column>
        <el-table-column label="離線回調" prop="offlineUrl"></el-table-column>
        <el-table-column label="夾帶SESSION" prop="sessionOpen">
          <template slot-scope="scope">
            {{ scope.row.sessionOpen ? "啟動" : "關閉" }}
          </template>
        </el-table-column>
        <el-table-column label="參照資源" prop="reference"></el-table-column>
        <el-table-column label="充值頁" prop="rechargeUrl"></el-table-column>
        <el-table-column label="客服頁" prop="customerUrl"></el-table-column>
        <el-table-column label="更新時間" prop="update"> </el-table-column
        ><el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit-outline"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </template> </el-table-column
      ></template>
    </TableWithPageAndSearch>
    <NewMerchantDialog
      v-if="showNewMerchantDialog"
      :add="add"
      :formEditMerchant="selectedMerchant"
      :showDialog="showNewMerchantDialog"
      :closeDialog="
        () => {
          showNewMerchantDialog = false;
        }
      "
      :submitForm="submitAddForm"
    />
  </div>
</template>

<script>
import { Message } from "element-ui";
import EventBus from "@/utilities/event-bus";
import NewMerchantDialog from "@/components/NewMerchantDialog.vue";
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
export default {
  components: { NewMerchantDialog, TableWithPageAndSearch },
  data: () => ({
    showNewMerchantDialog: false,
    add: true,
    selectedMerchant: {},
    data: [],
    columnToSearch: ["name"]
  }),
  methods: {
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
    }
  },
  mounted() {
    const statusArr = [true, false];
    for (let i = 0; i < 50; i++) {
      this.data.push({
        name: `AD${i}`,
        version: i,
        status: statusArr[i % 2],
        homeUrl: "http://starlord.test",
        sessionOpen: statusArr[i % 2],
        reference: "aa",
        customerUrl: "http://starlord.test",
        rechargeUrl: "http://starlord.test",
        offlineUrl: "http://starlord.test",
        update: `2019-07-29 ${i % 24}:29:35`,
        operator: "alisa"
      });
    }
    EventBus.$on("close-dialog", () => {
      this.showNewMerchantDialog = false;
    });
  }
};
</script>

<style></style>
