<template>
  <el-dialog :visible.sync="show" width="50%">
    <el-form :inline="true" :model="formData">
      <el-form-item size="mini" label="公告标题:">
        <el-input v-model="formData.title" />
      </el-form-item>
      <br />
      <RadioGroupWithTable />
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
import RadioGroupWithTable from "@/components/RadioGroupWithTable.vue";
export default {
  props: ["submitForm", "showDialog", "closeDialog", "add", "formEditGroup"],
  components: {
    RadioGroupWithTable
  },
  data: () => ({
    formData: {
      title: ""
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
          this.submitForm(this.formData);
        })
        .catch(() => {});
    }
  },
  mounted() {
    console.log(this.formEditGroup);
    if (!this.add) {
      this.formData = {
        ...this.formData
      };
    }
  }
};
</script>

<style></style>
