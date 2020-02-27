<template>
  <div>
    <el-tabs type="card" @tab-click="tabClickHandler" value="open">
      <el-tab-pane :label="$t('UserManagement')" name="open" key="open">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item :label="$t('Merchant') + ':'">
            <el-select v-model="searchForm.merchant" placeholder="請選擇">
              <el-option label="AD" value="ad"></el-option>
              <el-option label="SL" value="sl"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Number') + ':'">
            <el-input v-model="searchForm.account" />
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" icon="el-icon-search"></el-button>
          </el-form-item>
        </el-form>
        <TableWithPageAndSearch
          :data="userManagementDataTable"
          :columnToSearch="userManagementColumnSearch"
        >
          <template slot="column"
            ><el-table-column :label="$t('Merchant')" prop="merchant">
            </el-table-column>
            <el-table-column :label="$t('Number')" prop="accountNumber">
            </el-table-column>
            <el-table-column :label="$t('NickName')" prop="nickname">
            </el-table-column>
            <el-table-column label="USER ID" prop="uuid"> </el-table-column>
            <el-table-column :label="$t('AccountBalance')" prop="balance">
            </el-table-column>
            <el-table-column :label="$t('LastLoginTime')" prop="lastLogin">
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template> </el-table-column
          ></template> </TableWithPageAndSearch
      ></el-tab-pane>
      <el-tab-pane :label="$t('FrozenList')" name="closed" key="closed">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item :label="$t('Merchant') + ':'">
            <el-select v-model="searchForm.merchant" placeholder="請選擇">
              <el-option label="AD" value="ad"></el-option>
              <el-option label="SL" value="sl"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('AccountNumber') + ':'">
            <el-input v-model="searchForm.account" />
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" icon="el-icon-search"></el-button>
          </el-form-item> </el-form
        ><TableWithPageAndSearch
          :data="userManagementDataTable"
          :columnToSearch="userManagementColumnSearch"
        >
          <template slot="column"
            ><el-table-column :label="$t('Merchant')" prop="merchant">
            </el-table-column>
            <el-table-column :label="$t('Number')" prop="accountNumber">
            </el-table-column>
            <el-table-column :label="$t('NickName')" prop="nickname">
            </el-table-column>
            <el-table-column label="USER ID" prop="uuid"> </el-table-column>
            <el-table-column :label="$t('AccountBalance')" prop="balance">
            </el-table-column>
            <el-table-column :label="$t('LastLoginTime')" prop="lastLogin">
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template> </el-table-column
          ></template> </TableWithPageAndSearch
      ></el-tab-pane>
      <el-tab-pane :label="$t('FrozenLog')">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item :label="$t('Number')">
            <el-input v-model="searchForm.account" size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onSubmit"
              size="mini"
              icon="el-icon-search"
            ></el-button>
          </el-form-item> </el-form
        ><TableWithPageAndSearch
          :data="userManagementData"
          :columnToSearch="userManagementColumnSearch"
        >
          <template slot="column">
            <el-table-column :label="$t('Number')" prop="accountNumber">
            </el-table-column>
            <el-table-column :label="$t('NickName')" prop="nickname">
            </el-table-column>
            <el-table-column :label="$t('AccountBalance')" prop="balance">
            </el-table-column>
            <el-table-column :label="$t('Type')" prop="status">
              <template slot-scope="scope">
                {{ scope.row.status ? "凍結" : "一般" }}
              </template></el-table-column
            >
            <el-table-column
              :label="$t('Time')"
              prop="lastLogin"
            ></el-table-column>
            <el-table-column :label="$t('Operator')" prop="operator">
            </el-table-column
          ></template> </TableWithPageAndSearch
      ></el-tab-pane>
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
    tabOpen: false,
    userManagementData: [],
    userBlockLog: [],
    userManagementColumnSearch: ["nickname", "uuid"],
    userBlockLogColumnSearch: [],
    selectedUserManagementData: {},
    selectedUserBlockLog: {},
    showEditUserManagement: false,
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
    },
    tabClickHandler(tab) {
      this.tabOpen = tab.name !== "open";
    }
  },
  computed: {
    userManagementDataTable() {
      return this.userManagementData.filter(el => el.status === this.tabOpen);
    }
  }
};
</script>

<style></style>
