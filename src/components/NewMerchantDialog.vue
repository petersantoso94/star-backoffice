<template>
  <el-dialog :visible.sync="show" width="50%">
    <el-form
      :inline="true"
      label-width="120px"
      label-position="right"
      :model="formData"
    >
      <el-form-item
        size="mini"
        style="margin-right:27px"
        :label="$t('Merchant') + ':'"
      >
        <el-input v-model="formData.name" placeholder="AD" />
      </el-form-item>
      <el-form-item size="mini" :label="$t('VersionNumber') + ':'">
        <el-input v-model="formData.version" placeholder="123123132" />
      </el-form-item>
      <el-form-item size="mini" :label="$t('OpenMerchant') + ':'">
        <el-select v-model="formData.status" placeholder="請選擇">
          <el-option :label="$t('On')" value="啟動"></el-option>
          <el-option :label="$t('Off')" value="關閉"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" :label="$t('MerchantHomePage') + ':'">
        <el-input
          v-model="formData.homeUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
      <el-form-item size="mini" :label="$t('SessionEntrained') + ':'">
        <el-select v-model="formData.session" placeholder="請選擇">
          <el-option :label="$t('On')" value="啟動"></el-option>
          <el-option :label="$t('Off')" value="關閉"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" :label="$t('CustomerServicePage') + ':'">
        <el-input
          v-model="formData.customerUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
      <el-form-item
        size="mini"
        style="margin-right:27px"
        :label="$t('RechargePage') + ':'"
      >
        <el-input
          v-model="formData.rechargeUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
      <el-form-item size="mini" :label="$t('ReferenceResource') + ':'">
        <el-input v-model="formData.reference" placeholder="SL" />
      </el-form-item>
      <el-form-item size="mini" :label="$t('OfflineCallback') + ':'">
        <el-input
          v-model="formData.offlineUrl"
          placeholder="http://starlord.test"
        />
      </el-form-item>
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
