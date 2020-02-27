<template>
  <el-dialog :visible.sync="show" width="30%">
    <el-form
      :inline="true"
      label-width="100px"
      label-position="right"
      :model="formData"
    >
      <el-form-item size="mini" :label="$t('GameNumber') + ':'">
        {{ formData.id }}
      </el-form-item>
      <el-form-item size="mini" :label="$t('GameName') + ':'">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item size="mini" :label="$t('MaintenanceSwitch') + ':'">
        <el-select v-model="formData.open">
          <el-option :label="$t('On')" value="open"></el-option>
          <el-option :label="$t('Off')" value="closed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" :label="$t('MaintenanceSwitch') + ':'">
        <el-select v-model="formData.maintenance">
          <el-option :label="$t('On')" value="開啟"></el-option>
          <el-option :label="$t('Off')" value="關閉"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" :label="$t('GameLabel') + ':'">
        <el-select v-model="formData.tags">
          <el-option
            v-for="tag in tagsArr"
            :key="tag"
            :label="tag"
            :value="tag"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" :label="$t('GameType') + ':'">
        <el-select v-model="formData.category">
          <el-option
            v-for="cat in catArr"
            :key="cat"
            :label="cat"
            :value="cat"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="closeDialog">{{ $t("Cancel") }}</el-button>
      <el-button
        type="primary"
        size="mini"
        @click.prevent="submitForm(formData)"
        >{{ $t("Update") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import EventBus from "@/utilities/event-bus";
export default {
  props: ["showDialog", "closeDialog", "submitForm", "formEditGameSetting"],
  data: () => ({
    formData: {},
    tagsArr: ["熱門", "最新"],
    catArr: ["大廳", "老虎機", "百人棋牌", "對戰棋牌", "押分機"]
  }),
  mounted() {
    this.formData = { ...this.formEditGameSetting };
  },
  computed: {
    show: {
      get() {
        return this.showDialog;
      },
      set() {
        EventBus.$emit("close-dialog");
      }
    }
  }
};
</script>

<style></style>
