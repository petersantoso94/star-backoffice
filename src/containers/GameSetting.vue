<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item :label="$t('Merchant') + ':'">
        <el-select v-model="searchForm.merchant" placeholder="請選擇">
          <el-option label="AD" value="ad"></el-option>
          <el-option label="SL" value="sl"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('SortBy') + ':'">
        <el-select v-model="searchForm.sort" :placeholder="$t('GameLabel')">
          <el-option :label="$t('GameLabel')" value="游戏标签"></el-option>
          <el-option :label="$t('ReleasedTime')" value="上線時間"></el-option>
          <el-option label="遊戲標籤" value="遊戲標籤"></el-option>
          <el-option label="羅馬拼音" value="羅馬拼音"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <el-tabs type="card" @tab-click="tabClickHandler" value="open">
      <el-tab-pane name="open" key="open" :label="$t('EnableGame')">
        <TableWithPageAndSearch
          :data="dataTable"
          :columnToSearch="columnToSearch"
        >
          <template slot="column"
            ><el-table-column :label="$t('GameNumber')" prop="id">
            </el-table-column>
            <el-table-column :label="$t('GameName')" prop="name">
            </el-table-column>
            <el-table-column
              :label="$t('MaintenanceSwitch')"
              prop="maintenance"
            >
            </el-table-column>
            <el-table-column :label="$t('GameLabel')" prop="tags">
            </el-table-column>
            <el-table-column :label="$t('GameType')" prop="category">
            </el-table-column>
            <el-table-column
              :label="$t('LastOperationTime')"
              prop="lastOperation"
            >
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template> </el-table-column
          ></template>
        </TableWithPageAndSearch>
      </el-tab-pane>
      <el-tab-pane name="closed" key="closed" :label="$t('DisableGame')">
        <TableWithPageAndSearch
          :data="dataTable"
          :columnToSearch="columnToSearch"
        >
          <template slot="column"
            ><el-table-column :label="$t('GameNumber')" prop="id">
            </el-table-column>
            <el-table-column :label="$t('GameName')" prop="name">
            </el-table-column>
            <el-table-column
              :label="$t('MaintenanceSwitch')"
              prop="maintenance"
            >
            </el-table-column>
            <el-table-column :label="$t('GameLabel')" prop="tags">
            </el-table-column>
            <el-table-column :label="$t('GameType')" prop="category">
            </el-table-column>
            <el-table-column
              :label="$t('LastOperationTime')"
              prop="lastOperation"
            >
            </el-table-column>
            <el-table-column :label="$t('Actions')">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                ></el-button>
              </template> </el-table-column
          ></template>
        </TableWithPageAndSearch>
      </el-tab-pane>
    </el-tabs>
    <EditGameSettingDialog
      v-if="showEdit"
      :showDialog="showEdit"
      :closeDialog="
        () => {
          showEdit = false;
        }
      "
      :formEditGameSetting="selectedGame"
      :submitForm="submitEditForm"
    />
  </div>
</template>

<script>
import EditGameSettingDialog from "@/components/EditGameSettingDialog.vue";
import TableWithPageAndSearch from "@/components/TableWithPageAndSearch.vue";
import { Message } from "element-ui";
import EventBus from "@/utilities/event-bus";
export default {
  components: { EditGameSettingDialog, TableWithPageAndSearch },
  data: () => ({
    searchForm: { merchant: "", sort: "" },
    data: [],
    gameOpen: "open",
    showEdit: false,
    selectedGame: {},
    columnToSearch: ["name"]
  }),
  methods: {
    onSubmit() {
      console.log(this.searchForm);
    },
    handleEdit(idx, row) {
      console.log(idx, row);
      this.selectedGame = row;
      this.showEdit = true;
    },
    submitEditForm(form) {
      console.log(form);
      this.showEdit = false;
      Message.success({
        message: "Succesfully Edited.",
        type: "success"
      });
    },
    tabClickHandler(tab) {
      this.gameOpen = tab.name;
    }
  },
  mounted() {
    const tagsArr = ["熱門", "最新", "熱門"];
    const openArr = ["open", "closed"];
    for (let i = 0; i < 50; i++) {
      this.data.push({
        id: 1000 + i,
        name: `法老${i}`,
        maintenance: "開啟",
        tags: tagsArr[i % 3],
        category: "老虎機",
        lastOperation: "2019-07-29 14:29:35",
        open: openArr[i % 2]
      });
    }

    EventBus.$on("close-dialog", () => {
      this.showEdit = false;
    });
  },
  computed: {
    dataTable() {
      return this.data.filter(el => el.open === this.gameOpen);
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
