<template>
  <div>
    <el-button size="mini" @click="showDialogHandler">{{
      $t("NewData")
    }}</el-button>
    <el-form
      :inline="true"
      :model="searchForm"
      class="demo-form-inline"
      style="margin-top:20px"
      size="mini"
    >
      <el-form-item :label="$t('AnnouncementsTitle') + ':'">
        <el-input v-model="searchForm.title" />
      </el-form-item>
      <el-form-item :label="$t('Type') + ':'">
        <el-select v-model="searchForm.type" placeholder="請選擇">
          <el-option :label="$t('All')" value="全部"></el-option>
          <el-option :label="$t('General')" value="一般"></el-option>
          <el-option :label="$t('Urgent')" value="緊急"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Date') + ':'"
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
    <el-tabs type="card" style="margin-top:20px;">
      <el-tab-pane :label="$t('All')">
        <TableWithPageAndSearch :data="data" :exportExcel="exportExcelHandler">
          <template slot="column">
            <el-table-column :label="$t('Number')" prop="id"></el-table-column>
            <el-table-column :label="$t('Title')" prop="title">
            </el-table-column>
            <el-table-column :label="$t('Type')" prop="types">
            </el-table-column>
            <el-table-column :label="$t('Location')" prop="position">
            </el-table-column>
            <el-table-column
              :label="$t('StartTime')"
              prop="startTime"
            ></el-table-column>
            <el-table-column :label="$t('EndTime')" prop="endTime">
            </el-table-column>
            <el-table-column :label="$t('LoopSec')" prop="cycle">
            </el-table-column>
            <el-table-column :label="$t('Status')" prop="status">
            </el-table-column>
            <el-table-column :label="$t('Applicant')" prop="applicant">
            </el-table-column>
            <el-table-column :label="$t('Auditor')" prop="reviewer">
            </el-table-column>
          </template>
        </TableWithPageAndSearch>
      </el-tab-pane>
      <el-tab-pane :label="$t('PendingReview')"
        ><TableWithPageAndSearch :data="data" :exportExcel="exportExcelHandler">
          <template slot="column">
            <el-table-column :label="$t('Number')" prop="id"></el-table-column>
            <el-table-column :label="$t('Title')" prop="title">
            </el-table-column>
            <el-table-column :label="$t('Type')" prop="types">
            </el-table-column>
            <el-table-column :label="$t('Location')" prop="position">
            </el-table-column>
            <el-table-column
              :label="$t('StartTime')"
              prop="startTime"
            ></el-table-column>
            <el-table-column :label="$t('EndTime')" prop="endTime">
            </el-table-column>
            <el-table-column :label="$t('LoopSec')" prop="cycle">
            </el-table-column>
            <el-table-column :label="$t('Status')" prop="status">
            </el-table-column>
            <el-table-column :label="$t('Applicant')" prop="applicant">
            </el-table-column>
            <el-table-column :label="$t('Auditor')" prop="reviewer">
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEditAudit(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </template> </TableWithPageAndSearch
      ></el-tab-pane>
      <el-tab-pane :label="$t('Passed')"
        ><TableWithPageAndSearch :data="data" :exportExcel="exportExcelHandler">
          <template slot="column">
            <el-table-column :label="$t('Number')" prop="id"></el-table-column>
            <el-table-column :label="$t('Title')" prop="title">
            </el-table-column>
            <el-table-column :label="$t('Type')" prop="types">
            </el-table-column>
            <el-table-column :label="$t('Location')" prop="position">
            </el-table-column>
            <el-table-column
              :label="$t('StartTime')"
              prop="startTime"
            ></el-table-column>
            <el-table-column :label="$t('EndTime')" prop="endTime">
            </el-table-column>
            <el-table-column :label="$t('LoopSec')" prop="cycle">
            </el-table-column>
            <el-table-column :label="$t('Status')" prop="status">
            </el-table-column>
            <el-table-column :label="$t('Applicant')" prop="applicant">
            </el-table-column>
            <el-table-column :label="$t('Auditor')" prop="reviewer">
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </template> </TableWithPageAndSearch
      ></el-tab-pane>
      <el-tab-pane :label="$t('Rejected')"
        ><TableWithPageAndSearch :data="data" :exportExcel="exportExcelHandler">
          <template slot="column">
            <el-table-column :label="$t('Number')" prop="id"></el-table-column>
            <el-table-column :label="$t('Title')" prop="title">
            </el-table-column>
            <el-table-column :label="$t('Type')" prop="types">
            </el-table-column>
            <el-table-column :label="$t('Location')" prop="position">
            </el-table-column>
            <el-table-column
              :label="$t('StartTime')"
              prop="startTime"
            ></el-table-column>
            <el-table-column :label="$t('EndTime')" prop="endTime">
            </el-table-column>
            <el-table-column :label="$t('LoopSec')" prop="cycle">
            </el-table-column>
            <el-table-column :label="$t('Status')" prop="status">
            </el-table-column>
            <el-table-column :label="$t('Applicant')" prop="applicant">
            </el-table-column>
            <el-table-column :label="$t('Auditor')" prop="reviewer">
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </template> </TableWithPageAndSearch
      ></el-tab-pane>
      <el-tab-pane :label="$t('Deleted')"
        ><TableWithPageAndSearch :data="data" :exportExcel="exportExcelHandler">
          <template slot="column">
            <el-table-column :label="$t('Number')" prop="id"></el-table-column>
            <el-table-column :label="$t('Title')" prop="title">
            </el-table-column>
            <el-table-column :label="$t('Type')" prop="types">
            </el-table-column>
            <el-table-column :label="$t('Location')" prop="position">
            </el-table-column>
            <el-table-column
              :label="$t('StartTime')"
              prop="startTime"
            ></el-table-column>
            <el-table-column :label="$t('EndTime')" prop="endTime">
            </el-table-column>
            <el-table-column :label="$t('LoopSec')" prop="cycle">
            </el-table-column>
            <el-table-column :label="$t('Status')" prop="status">
            </el-table-column>
            <el-table-column :label="$t('Applicant')" prop="applicant">
            </el-table-column>
            <el-table-column :label="$t('Auditor')" prop="reviewer">
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </template> </TableWithPageAndSearch
      ></el-tab-pane>
    </el-tabs>
    <NewMarketingDialog
      v-if="showNewMarketingDialog"
      :add="add"
      :formEditMarketing="selectedMarketing"
      :showDialog="showNewMarketingDialog"
      :closeDialog="
        () => {
          showNewMarketingDialog = false;
        }
      "
      @close-dialog="showNewMarketingDialog = false"
      :submitForm="submitAddForm"
    />
    <MarketingAuditPopup
      v-if="showMarketingAuditDialog"
      :showDialog="showMarketingAuditDialog"
      :closeDialog="
        () => {
          showMarketingAuditDialog = false;
        }
      "
      @close-dialog="showMarketingAuditDialog = false"
      :submitForm="submitAddForm"
    />
  </div>
</template>

<script>
import NewMarketingDialog from "@/components/NewMarketingDialog.vue";
import MarketingAuditPopup from "@/components/MarketingAuditPopup.vue";
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
import { Message } from "element-ui";
export default {
  components: {
    TableWithPageAndSearch,
    NewMarketingDialog,
    MarketingAuditPopup
  },
  data: () => ({
    showNewMarketingDialog: false,
    showMarketingAuditDialog: false,
    searchForm: { title: "", type: "", date: [] },
    add: true,
    selectedMarketing: {},
    data: [],
    columnToSearch: ["name"]
  }),
  methods: {
    onSubmit() {
      console.log(this.searchForm);
    },
    submitAddForm(form) {
      console.log(form);
      this.showNewMarketingDialog = false;
      this.showMarketingAuditDialog = false;
      Message.success({
        message: "Succesfully " + (this.add ? "added" : "editted"),
        type: "success"
      });
    },
    handleEdit(idx, row) {
      console.log(row, idx);
      this.selectedMarketing = row;
      this.add = false;
      this.showNewMarketingDialog = true;
    },
    handleEditAudit(idx, row) {
      console.log(row, idx);
      this.selectedMarketing = row;
      this.add = false;
      this.showMarketingAuditDialog = true;
    },
    showDialogHandler() {
      this.add = true;
      this.showNewMarketingDialog = true;
    },
    exportExcelHandler() {
      console.log("exporting excel...");
    }
  },
  mounted() {
    for (let i = 0; i < 50; i++) {
      this.data.push({
        title: `AD${i}`,
        id: i,
        types: "aa",
        position: "bb",
        startTime: `2019-07-29 00:29:35`,
        endTime: `2019-07-29 00:29:35`,
        cycle: 22,
        status: "active",
        applicant: "cc",
        reviewer: "alisa"
      });
    }
  }
};
</script>

<style></style>
