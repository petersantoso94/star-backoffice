<template>
  <div>
    <el-button size="mini" @click="showDialogHandler">{{
      $t("NewData")
    }}</el-button>
    <TableWithPageAndSearch
      style="margin-top:20px"
      :data="data"
      :columnToSearch="columnToSearch"
    >
      <template slot="column">
        <el-table-column :label="$t('Merchant')" prop="name"> </el-table-column>
        <el-table-column :label="$t('VersionNumber')" prop="version">
        </el-table-column>
        <el-table-column :label="$t('OpenMerchant')" prop="status"
          ><template slot-scope="scope">
            {{ scope.row.status ? $t("On") : $t("Off") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('MerchantHomePage')" prop="homeUrl">
        </el-table-column>
        <el-table-column
          :label="$t('OfflineCallback')"
          prop="offlineUrl"
        ></el-table-column>
        <el-table-column :label="$t('SessionEntrained')" prop="sessionOpen">
          <template slot-scope="scope">
            {{ scope.row.sessionOpen ? "啟動" : $t("Off") }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('ReferenceResource')"
          prop="reference"
        ></el-table-column>
        <el-table-column
          :label="$t('RechargePage')"
          prop="rechargeUrl"
        ></el-table-column>
        <el-table-column
          :label="$t('CustomerServicePage')"
          prop="customerUrl"
        ></el-table-column>
        <el-table-column :label="$t('UpdateTime')" prop="update">
        </el-table-column
        ><el-table-column :label="$t('Actions')">
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
