<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-image
      style="height:60px"
      src="http://dev3.starlordtech.net:8000/html/images/logo.png"
    ></el-image>
    <el-menu :default-active="'5-0'">
      <el-submenu v-for="(bar, idx) in sideBarArr" :key="idx" :index="idx + ''">
        <template slot="title">{{ bar.name }}</template>
        <el-menu-item-group v-if="bar.submenu.length > 0">
          <el-menu-item
            v-for="(submenu, idxs) in bar.submenu"
            :key="idxs"
            :index="`${idx}-${idxs}`"
            @click="goToPage(submenu.page)"
            >{{ submenu.label }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { ChooseCurrentPage } from "@/utilities/event-bus";
export default {
  name: "SideBar",
  computed: {
    sideBarArr: function() {
      return [
        { name: this.$t("PlayersAnalysis"), submenu: [] },
        {
          name: this.$t("BalanceReview"),
          submenu: [
            { label: this.$t("GameRecords") },
            { label: this.$t("BalanceRecords") }
          ]
        },
        { name: this.$t("AccountingAudit"), submenu: [] },
        {
          name: this.$t("AccountingAnalysis"),
          submenu: [
            { label: this.$t("PlatformRecords") },
            { label: this.$t("PlayersRecords") },
            { label: this.$t("PlayersManage") }
          ]
        },
        {
          name: this.$t("MarketingSettings"),
          submenu: [
            { label: this.$t("SettingGames"), page: "GameSetting" },
            { label: this.$t("SettingUsers"), page: "UserSetting" },
            { label: this.$t("SettingSubsidiary"), page: "MerchantSetting" },
            { label: this.$t("SettingAnnouncements"), page: "MarketingSetting" }
          ]
        },
        {
          name: this.$t("PrivilegeManage"),
          submenu: [
            { label: this.$t("PermissionUsers"), page: "AccountSetting" },
            { label: this.$t("PermissionGroups"), page: "GroupSetting" },
            { label: this.$t("OperationLogs"), page: "OperationLogs" }
          ]
        }
      ];
    }
  },
  methods: {
    goToPage: page => {
      ChooseCurrentPage(page);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
