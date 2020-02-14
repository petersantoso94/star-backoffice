<template>
  <el-dialog :visible.sync="show" width="50%">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" style="margin-right:27px" label="商戶名稱:">
        <el-input v-model="formData.name" placeholder="AD" />
      </el-form-item>
      <el-form-item size="mini" label="版本號:">
        <el-input v-model="formData.version" placeholder="123123132" />
      </el-form-item>
      <el-form-item size="mini" label="商戶開通:">
        <el-select v-model="formData.status" placeholder="請選擇">
          <el-option label="啟動" value="啟動"></el-option>
          <el-option label="關閉" value="關閉"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" label="商戶首頁:">
        <el-input
          v-model="formData.homeUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
      <el-form-item size="mini" label="夾帶SESSION:">
        <el-select v-model="formData.session" placeholder="請選擇">
          <el-option label="啟動" value="啟動"></el-option>
          <el-option label="關閉" value="關閉"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" label="客服頁:">
        <el-input
          v-model="formData.customerUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
      <el-form-item size="mini" style="margin-right:27px" label="充值頁:">
        <el-input
          v-model="formData.rechargeUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
      <el-form-item size="mini" label="參照資源:">
        <el-input v-model="formData.reference" placeholder="SL" />
      </el-form-item>
      <el-form-item size="mini" label="離線回調:">
        <el-input
          v-model="formData.offlineUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
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
import EventBus from "@/utilities/event-bus";
import { MessageBox } from "element-ui";
export default {
  props: ["submitForm", "showDialog", "closeDialog", "add", "formEditMerchant"],
  data: () => ({
    formData: {
      name: "",
      version: "",
      status: "關閉",
      homeUrl: "",
      session: "啟動",
      customerUrl: "",
      rechargeUrl: "",
      reference: "",
      offlineUrl: ""
    }
  }),
  computed: {
    show: {
      get() {
        return this.showDialog;
      },
      set() {
        EventBus.$emit("close-dialog");
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
        name: this.formEditMerchant.name,
        version: this.formEditMerchant.version,
        status: this.formEditMerchant.status ? "啟動" : "關閉",
        homeUrl: this.formEditMerchant.homeUrl,
        session: this.formEditMerchant.sessionOpen ? "啟動" : "關閉",
        customerUrl: this.formEditMerchant.customerUrl,
        rechargeUrl: this.formEditMerchant.rechargeUrl,
        reference: this.formEditMerchant.reference,
        offlineUrl: this.formEditMerchant.offlineUrl
      };
    }
  }
};
</script>

<style></style>
