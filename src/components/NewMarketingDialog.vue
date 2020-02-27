<template>
  <el-dialog :visible.sync="show" width="50%">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" :label="$t('SettingAnnouncements') + ':'">
        <el-checkbox-group v-model="formData.position">
          <el-checkbox label="大厅页面"></el-checkbox>
          <el-checkbox label="游戏页面"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item size="mini" :label="$t('AnnouncementsTitle') + ':'">
        <el-input v-model="formData.title" style="width: 400px;" />
      </el-form-item>
      <br />
      <el-form-item size="mini" label="公告类别:">
        <el-radio-group v-model="formData.category">
          <el-radio label="普通">{{ $t("General") }}</el-radio>
          <el-radio label="紧急">{{ $t("Urgent") }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <el-form-item size="mini" :label="$t('ReleasedTime') + ':'">
        <el-date-picker
          v-model="formData.date"
          type="datetimerange"
          range-separator="~"
          start-placeholder="Start date"
          end-placeholder="End date"
        ></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item size="mini" :label="$t('Frequency') + ':'">
        <el-radio-group v-model="formData.plays">
          <el-radio label="一次">{{ $t("Once") }}</el-radio>
          <el-radio label="重复">重复</el-radio>
        </el-radio-group>
        , 每
        <el-input v-model="formData.time" style="width:40%" />
        {{ $t("RepeatEveryXSec") }}
      </el-form-item>
      <br />
      <el-form-item size="mini" label="公告内容:">
        <el-input v-model="formData.content" style="width: 400px;" />
      </el-form-item>
      <br />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">{{ $t("Cancel") }}</el-button>
      <el-button type="primary" size="mini" @click.prevent="openConfirm">{{
        $t("Update")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { MessageBox } from "element-ui";
export default {
  props: [
    "submitForm",
    "showDialog",
    "closeDialog",
    "add",
    "formEditMarketing"
  ],
  data: () => ({
    formData: {
      position: ["大厅页面"],
      title: "",
      category: "普通",
      date: [],
      plays: "重复",
      time: "",
      content: ""
    }
  }),
  computed: {
    show: {
      get() {
        return this.showDialog;
      },
      set() {
        this.$emit("close-dialog");
      }
    }
  },
  methods: {
    openConfirm() {
      MessageBox.confirm(
        "警告!目前「商戶開通」選項為關閉狀態，若確認關閉該商戶將無法啟動.",
        "",
        {
          confirmButtonText: "確認",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.submitForm();
        })
        .catch(() => {});
    }
  },
  mounted() {
    console.log(this.formEditMarketing);
    if (!this.add) {
      this.formData = {
        ...this.formData,
        title: this.formEditMarketing.title,
        date: [this.formEditMarketing.startTime, this.formEditMarketing.endTime]
      };
    }
  }
};
</script>

<style></style>
