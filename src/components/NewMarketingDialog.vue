<template>
  <el-dialog :visible.sync="show" width="50%">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" label="公告位置:">
        <el-checkbox-group v-model="formData.position">
          <el-checkbox label="大厅页面"></el-checkbox>
          <el-checkbox label="游戏页面"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item size="mini" label="公告标题:">
        <el-input v-model="formData.title" style="width: 400px;" />
      </el-form-item>
      <br />
      <el-form-item size="mini" label="公告类别:">
        <el-radio-group v-model="formData.category">
          <el-radio label="普通">普通</el-radio>
          <el-radio label="紧急">紧急</el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <el-form-item size="mini" label="发布时间:">
        <el-date-picker
          v-model="formData.date"
          type="datetimerange"
          range-separator="~"
          start-placeholder="Start date"
          end-placeholder="End date"
        ></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item size="mini" label="播放次数:">
        <el-radio-group v-model="formData.plays">
          <el-radio label="一次">一次</el-radio>
          <el-radio label="重复">重复</el-radio>
        </el-radio-group>
        , 每
        <el-input v-model="formData.time" style="width:40%" />
        秒重复播放
      </el-form-item>
      <br />
      <el-form-item size="mini" label="公告内容:">
        <el-input v-model="formData.content" style="width: 400px;" />
      </el-form-item>
      <br />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button type="primary" size="mini" @click.prevent="openConfirm"
        >更新</el-button
      >
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
