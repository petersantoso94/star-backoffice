<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="商戶:">
        <el-select v-model="searchForm.merchant" placeholder="請選擇">
          <el-option label="AD" value="ad"></el-option>
          <el-option label="SL" value="sl"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="帳號:">
        <el-input v-model="searchForm.account" />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="card">
      <el-tab-pane label="用戶管理"
        ><TableWithPageAndSearch
          :data="userManagementData"
          :columnToSearch="userManagementColumnSearch"
        >
          <template slot="column"
            ><el-table-column label="商戶" prop="merchant"> </el-table-column>
            <el-table-column label="帳號" prop="accountNumber">
            </el-table-column>
            <el-table-column label="暱稱" prop="nickname"> </el-table-column>
            <el-table-column label="USER ID" prop="uuid"> </el-table-column>
            <el-table-column label="帳戶餘額" prop="balance"> </el-table-column>
            <el-table-column label="最近登入時間" prop="lastLogin">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template> </el-table-column
          ></template> </TableWithPageAndSearch
      ></el-tab-pane>
      <el-tab-pane label="凍結名單">凍結名單</el-tab-pane>
      <el-tab-pane label="凍結LOG">凍結LOG</el-tab-pane>
    </el-tabs>
    <EditUserSettingDialog
      v-if="showEditUserManagement"
      :showDialog="showEditUserManagement"
      :closeDialog="
        () => {
          showEditUserManagement = false;
        }
      "
      :formEditUserSetting="selectedUserManagementData"
      :submitForm="submitEditForm"
    />
  </div>
</template>

<script>
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
import EditUserSettingDialog from "@/components/EditUserSettingDialog.vue";
import EventBus from "@/utilities/event-bus";
import { Message } from "element-ui";
export default {
  components: { TableWithPageAndSearch, EditUserSettingDialog },
  data: () => ({
    searchForm: { merchant: "", account: "" },
    userManagementData: [],
    userBlockData: [],
    userBlockLog: [],
    userManagementColumnSearch: ["nickname", "uuid"],
    userBlockColumnSearch: [],
    userBlockLogColumnSearch: [],
    selectedUserManagementData: {},
    selectedUserBlockData: {},
    selectedUserBlockLog: {},
    showEditUserManagement: false,
    showEditUserBlockData: false,
    showEditUserBlockLog: false
  }),
  mounted() {
    const merchantArr = ["AD", "AC", "AB"];
    const statusArr = [true, false];
    for (let i = 0; i < 50; i++) {
      this.userManagementData.push({
        uuid: 1000 + i,
        balance: i,
        merchant: merchantArr[i % 3],
        accountNumber: "bb",
        nickname: "aa",
        lastLogin: `2019-07-29 ${i % 24}:29:35`,
        operator: "alisa",
        status: statusArr[i % 2]
      });
    }
    EventBus.$on("close-dialog-user-setting", () => {
      this.showEditUserManagement = false;
    });
  },
  methods: {
    onSubmit() {
      console.log(this.searchForm);
    },
    handleEdit(idx, row) {
      console.log(idx, row);
      this.selectedUserManagementData = row;
      this.showEditUserManagement = true;
    },
    submitEditForm(form) {
      console.log(form);
      this.showEditUserManagement = false;
      Message.success({
        message: "Succesfully Edited.",
        type: "success"
      });
    }
  }
};
</script>

<style></style>
