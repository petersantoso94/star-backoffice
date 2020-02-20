<template>
  <div>
    <el-form>
      <table class="tableScrollable">
        <thead>
          <th></th>
          <th>權限</th>
          <th>報表</th>
        </thead>
        <tbody>
          <template v-for="(rad, idx) in groupLabelArr">
            <tr :key="idx + '-tr1-'">
              <td colspan="3" :key="idx">{{ rad }}</td>
            </tr>
            <tr
              v-for="data in radioData(rad)"
              :key="idx + '-tr2-' + data.label"
            >
              <td style="width:15%;padding-left:20px;">
                {{ data.label }}
              </td>
              <td class="centerTD">
                <el-radio-group v-model="data.authority">
                  <el-radio
                    v-for="auth in authorityOption"
                    :key="idx + data.label + auth"
                    :label="auth"
                    >{{ auth }}</el-radio
                  >
                </el-radio-group>
              </td>
              <td class="centerTD">
                <el-radio-group v-model="data.report">
                  <el-radio
                    v-for="auth in reportingOption"
                    :key="idx + data.label + auth"
                    :label="auth"
                    >{{ auth }}</el-radio
                  >
                </el-radio-group>
              </td>
            </tr>
            <tr :key="idx + '-tr3-'">
              <td colspan="3" class="borderBot"></td>
            </tr>
          </template>
        </tbody>
      </table>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["groupData"],
  data: () => ({
    authorityOption: ["編輯", "檢視", "隱藏"],
    reportingOption: ["報表匯出", "隱藏"],
    groupLabelArr: ["用戶中心", "遊戲中心", "票務審核"],
    initRadioData: [
      {
        label: "導流",
        authority: "",
        report: "",
        groupLabel: "用戶中心"
      },
      {
        label: "首登",
        authority: "",
        report: "",
        groupLabel: "用戶中心"
      },
      {
        label: "投注紀錄",
        authority: "",
        report: "",
        groupLabel: "遊戲中心"
      },
      {
        label: "個人損益",
        authority: "",
        report: "",
        groupLabel: "遊戲中心"
      },
      {
        label: "商戶損益",
        authority: "",
        report: "",
        groupLabel: "遊戲中心"
      },
      {
        label: "票務審核",
        authority: "",
        report: "",
        groupLabel: "票務審核"
      }
    ]
  }),
  methods: {
    radioData(req) {
      let newData = [...this.initRadioData];
      if (this.groupData) newData = [...this.groupData];
      return newData.filter(data => data.groupLabel === req);
    }
  }
};
</script>

<style>
.tableScrollable {
  max-height: 100vh;
  overflow-y: scroll;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1em;
}
.borderBot {
  border-bottom: 1px solid #ddd !important;
}
.centerTD {
  text-align: center;
  vertical-align: middle;
}
</style>
