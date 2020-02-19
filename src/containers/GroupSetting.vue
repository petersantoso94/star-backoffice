<template>
  <div>
    <el-button size="mini" @click="showDialogHandler">新增</el-button
    ><RadioGroupWithTable />
    <NewGroupDialog
      v-if="showNewGroup"
      :add="add"
      :formEditMarketing="selectedGroup"
      :showDialog="showNewGroup"
      :closeDialog="
        () => {
          showNewGroup = false;
        }
      "
      @close-dialog="showNewGroup = false"
      :submitForm="submitAddForm"
    />
  </div>
</template>

<script>
import RadioGroupWithTable from "@/components/RadioGroupWithTable.vue";
import NewGroupDialog from "@/components/NewGroupDialog.vue";
import { Message } from "element-ui";
export default {
  data: () => ({
    selectedGroup: {},
    add: true,
    showNewGroup: false
  }),
  components: { RadioGroupWithTable, NewGroupDialog },
  methods: {
    showDialogHandler() {
      this.showNewGroup = true;
    },
    submitAddForm(form) {
      console.log(form);
      this.showNewGroup = false;
      Message.success({
        message: "Succesfully Edited.",
        type: "success"
      });
    }
  }
};
</script>

<style></style>
