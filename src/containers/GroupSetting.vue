<template>
  <div>
    <el-button size="mini" @click="showDialogHandler">新增</el-button>
    <TableWithPageAndSearch
      :data="data"
      :exportExcel="exportExcelHandler"
      style="margin-top:12px"
    >
      <template slot="column">
        <el-table-column type="expand" prop="groups">
          <template slot-scope="props">
            <RadioGroupWithTable :groupData="props.row.groups" />
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="群组名称" prop="name"> </el-table-column>
        <el-table-column label="建立时间" prop="created"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit-outline"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </template>
    </TableWithPageAndSearch>
    <NewGroupDialog
      v-if="showNewGroup"
      :add="add"
      :formEditGroup="selectedGroup"
      :showDialog="showNewGroup"
      :closeDialog="
        () => {
          showNewGroup = false;
        }
      "
      @close-dialog="showNewGroup = false"
      :submitForm="submitAddForm"
    />
  </div>
</template>

<script>
import RadioGroupWithTable from "@/components/RadioGroupWithTable.vue";
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
import NewGroupDialog from "@/components/NewGroupDialog.vue";
import { Message } from "element-ui";
export default {
  data: () => ({
    selectedGroup: {},
    add: true,
    showNewGroup: false,
    data: []
  }),
  components: { RadioGroupWithTable, NewGroupDialog, TableWithPageAndSearch },
  methods: {
    showDialogHandler() {
      this.showNewGroup = true;
    },
    submitAddForm(form) {
      console.log(form);
      this.showNewGroup = false;
      Message.success({
        message: "Succesfully Edited.",
        type: "success"
      });
    },
    handleEdit(idx, row) {
      console.log(row, idx);
      this.selectedGroup = row;
      this.add = false;
      this.showNewGroup = true;
    },
    exportExcelHandler() {
      console.log("exporting excel...");
    }
  },
  mounted() {
    const authorityOption = ["編輯", "檢視", "隱藏"];
    const reportingOption = ["報表匯出", "隱藏"];
    for (let i = 0; i < 50; i++) {
      this.data.push({
        name: `AD${i}`,
        id: i,
        created: `2019-07-29 00:29:35`,
        groups: [
          {
            label: "導流",
            authority: authorityOption[i % 3],
            report: reportingOption[i % 2],
            groupLabel: "用戶中心"
          },
          {
            label: "首登",
            authority: authorityOption[i % 3],
            report: reportingOption[i % 2],
            groupLabel: "用戶中心"
          },
          {
            label: "投注紀錄",
            authority: authorityOption[i % 3],
            report: reportingOption[i % 2],
            groupLabel: "遊戲中心"
          },
          {
            label: "個人損益",
            authority: authorityOption[i % 3],
            report: reportingOption[i % 2],
            groupLabel: "遊戲中心"
          },
          {
            label: "商戶損益",
            authority: authorityOption[i % 3],
            report: reportingOption[i % 2],
            groupLabel: "遊戲中心"
          },
          {
            label: "票務審核",
            authority: authorityOption[i % 3],
            report: reportingOption[i % 2],
            groupLabel: "票務審核"
          }
        ]
      });
    }
  }
};
</script>

<style></style>
