<template>
  <el-dialog :visible.sync="show" width="18%" title="審核">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" label="公告类别:">
        <el-radio-group v-model="formData.category">
          <el-radio label="通過">通過</el-radio>
          <el-radio label="拒絕">拒絕</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button type="primary" size="mini" @click.prevent="submitForm"
        >確認</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["submitForm", "showDialog", "closeDialog", "add", "formEditMerchant"],
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
  }
};
</script>

<style></style>
