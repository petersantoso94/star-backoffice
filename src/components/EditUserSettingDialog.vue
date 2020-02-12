<template>
  <el-dialog :visible.sync="show" width="30%">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" label="帳號:">
        {{ formData.accountNumber }}
      </el-form-item>
      <br />
      <el-form-item size="mini" label="帳戶餘額:">
        {{ formData.balance }}
      </el-form-item>
      <br />
      <el-form-item size="mini" label="帳號狀態:">
        {{ formData.status ? "凍結" : "一般" }}
      </el-form-item>
      <br />
      <el-form-item size="mini" label=" ">
        <el-checkbox label="凍結" v-model="formData.status"></el-checkbox>
      </el-form-item>
      <el-form-item size="mini" label="原因:">
        <el-input type="textarea" v-model="formData.desc"></el-input
      ></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click.prevent="submitForm(formData)"
        >更新</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import EventBus from "@/utilities/event-bus";
export default {
  props: ["showDialog", "closeDialog", "submitForm", "formEditUserSetting"],
  data: () => ({
    formData: {}
  }),
  mounted() {
    this.formData = { ...this.formEditUserSetting };
  },
  computed: {
    show: {
      get() {
        return this.showDialog;
      },
      set() {
        EventBus.$emit("close-dialog-user-setting");
      }
    }
  }
};
</script>

<style></style>
