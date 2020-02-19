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
  data: () => ({
    sideBarArr: [
      { name: "用戶分析", submenu: [] },
      {
        name: "盈虧報表",
        submenu: [{ label: "投注紀錄" }, { label: "損益紀錄" }]
      },
      { name: "票務審核", submenu: [] },
      {
        name: "金流分析",
        submenu: [
          { label: "平台紀錄" },
          { label: "個人紀錄" },
          { label: "個人管理" }
        ]
      },
      {
        name: "營銷管理",
        submenu: [
          { label: "遊戲設定", page: "GameSetting" },
          { label: "用戶設定", page: "UserSetting" },
          { label: "商戶設定", page: "MerchantSetting" },
          { label: "公告設定", page: "MarketingSetting" }
        ]
      },
      {
        name: "權限中心",
        submenu: [
          { label: "帳號管理", page: "AccountSetting" },
          { label: "群組管理", page: "GroupSetting" },
          { label: "操作日誌", page: "OperationLogs" }
        ]
      }
    ]
  }),
  methods: {
    goToPage: page => {
      ChooseCurrentPage(page);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
