<template>
  <el-dialog :visible.sync="show" width="30%">
    <el-form
      :inline="true"
      label-width="80px"
      label-position="right"
      :model="formData"
    >
      <el-tabs type="card" style="margin-top:20px;">
        <el-tab-pane label="個別">
          <el-form-item size="mini" label="帳號:">
            <el-input v-model="formData.id" />
          </el-form-item>
          <el-form-item size="mini" label="密碼:">
            <el-input v-model="formData.account" />
          </el-form-item>
          <el-form-item size="mini" label="群組:">
            <el-checkbox-group
              v-model="formData.position"
              style="margin-left:50px"
            >
              <el-checkbox label="管理員"></el-checkbox>
              <el-checkbox label="企劃人員"></el-checkbox>
              <el-checkbox label="客服人員"></el-checkbox>
              <el-checkbox label="商戶業務"></el-checkbox>
            </el-checkbox-group> </el-form-item
        ></el-tab-pane>
        <el-tab-pane label="批次">
          <el-form-item size="mini" label="帳號:">
            <el-input
              v-model="formData.account"
              style="width:225px"
              placeholder="EX: Alisa"
            />
          </el-form-item>
          <el-form-item size="mini" label="編號:">
            <div style="width:300px">
              <el-input-number
                :controls="false"
                v-model="formData.from"
                style="width:35%"
              />
              ~
              <el-input-number
                :controls="false"
                v-model="formData.to"
                style="width:35%"
              />
            </div>
          </el-form-item>
          <el-form-item size="mini" label="小計:">9組</el-form-item>
          <el-form-item size="mini" label="群組:">
            <el-checkbox-group
              v-model="formData.position"
              style="margin-left:50px"
            >
              <el-checkbox label="管理員"></el-checkbox>
              <el-checkbox label="企劃人員"></el-checkbox>
              <el-checkbox label="客服人員"></el-checkbox>
              <el-checkbox label="商戶業務"></el-checkbox>
            </el-checkbox-group> </el-form-item
        ></el-tab-pane>
      </el-tabs>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button type="primary" size="mini" @click.prevent="openConfirm"
        >確認</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { MessageBox } from "element-ui";
export default {
  props: ["submitForm", "showDialog", "closeDialog", "add", "formEditMerchant"],
  data: () => ({
    formData: {
      position: ["大厅页面"],
      id: "",
      account: "",
      from: "",
      to: ""
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
    console.log(this.formEditMerchant);
    if (!this.add) {
      this.formData = {
        ...this.formData,
        id: this.formEditMerchant.id,
        account: this.formEditMerchant.account,
        position: [this.formEditMerchant.group]
      };
    }
  }
};
</script>

<style></style>
