<template>
  <el-dialog :visible.sync="show" width="30%">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" :label="$t('AccountNumber') + ':'">
        {{ formData.accountNumber }}
      </el-form-item>
      <br />
      <el-form-item size="mini" :label="$t('AccountBalance') + ':'">
        {{ formData.balance }}
      </el-form-item>
      <br />
      <el-form-item size="mini" :label="$t('AccountStatus') + ':'">
        {{ formData.status ? "凍結" : "一般" }}
      </el-form-item>
      <br />
      <el-form-item size="mini" :label="$t('Reasons')">
        <el-input type="textarea" v-model="formData.desc"></el-input
      ></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">{{ $t("Cancel") }}</el-button>
      <el-button
        type="primary"
        size="mini"
        @click.prevent="submitForm(formData)"
        >{{ !formData.status ? "凍結" : "解凍" }}</el-button
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
