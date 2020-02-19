<template>
  <div id="app">
    <el-container style=" border: 2px solid #eee">
      <SideBar />
      <el-container>
        <el-header style="text-align: right; font-size: 12px;">
          <el-select v-model="lang" size="mini" style="margin-right:15px">
            <el-option label="簡體中文" value="zh-cn"></el-option>
            <el-option label="英文" value="en"></el-option>
          </el-select>
          <el-dropdown size="mini" type="primary">
            <i class="el-icon-user-solid">
              Alisa
              <i class="el-icon-caret-bottom"></i>
            </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Edit Profile</el-dropdown-item>
              <el-dropdown-item>Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <keep-alive>
            <component :is="currentPage"></component>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import UserSetting from "@/containers/UserSetting.vue";
import GameSetting from "@/containers/GameSetting.vue";
import MerchantSetting from "@/containers/MerchantSetting.vue";
import MarketingSetting from "@/containers/MarketingSetting.vue";
import AccountSetting from "@/containers/AccountSetting.vue";
import GroupSetting from "@/containers/GroupSetting.vue";
import OperationLogs from "@/containers/OperationLogs.vue";
import EventBus from "@/utilities/event-bus";
export default {
  name: "app",
  components: {
    SideBar,
    UserSetting,
    GameSetting,
    MerchantSetting,
    MarketingSetting,
    AccountSetting,
    GroupSetting,
    OperationLogs
  },
  data: () => ({
    currentPage: "AccountSetting",
    lang: "簡體中文"
  }),
  mounted() {
    EventBus.$on("choose-current-page", page => {
      this.currentPage = page;
    });
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
