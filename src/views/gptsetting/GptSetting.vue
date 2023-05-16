<template>
  <div class="gptsetting py-4 px-8">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="18">
          <el-form-item label="开启单聊">
            <el-switch v-model="form.singleChat"></el-switch> </el-form-item
        ></el-col> </el-row
      ><el-row>
        <el-col :span="18">
          <el-form-item label="AI触发词">
            <el-select
              v-model="form.firstName"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请填写AI触发词"
            >
            </el-select> </el-form-item></el-col></el-row
      ><el-row>
        <el-col :span="18">
          <el-form-item label="AI群聊">
            <el-select
              v-model="form.vipRoom"
              placeholder="请选择开启AI的群聊"
              multiple
            >
              <el-option
                v-for="(room, i) in roomList"
                :key="i"
                :label="room.payload.topic"
                :value="room.payload.topic || room.payload.id"
              ></el-option>
            </el-select> </el-form-item></el-col></el-row
      ><el-row>
        <el-col :span="18">
          <el-form-item label="AI私聊">
            <el-select
              v-model="form.vipUser"
              placeholder="请选择开启AI的单聊"
              multiple
              filterable
            >
              <el-option
                v-for="(room, i) in contactList"
                :key="i"
                :label="room.payload.name"
                :value="room.payload.name || room.payload.id"
              ></el-option>
            </el-select> </el-form-item></el-col
      ></el-row>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">保存到本地文件</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>
  
  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { wxBot } from "@/bot";
import { vipRoom, vipUser, firstName, replayObj } from "@/utils/constant";

@Component({
  components: {},
})
export default class GptSetting extends Vue {
  async created() {
    this.form = this.$store.state.setting;
    this.contactList = await wxBot.Contact.findAll();
    this.roomList = await wxBot.Room.findAll();
  }

  roomList: any[] = [];
  contactList: any[] = [];
  form = {
    singleChat: false,
    firstName: [],
    replayObj: {},
    vipRoom: [],
    vipUser: [],
  };

  onSubmit = () => {
    this.$confirm("此操作会修改本地默认配置, 确认修改?", "注意", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      vipRoom.length = 0;
      vipRoom.concat(this.form.vipRoom);

      vipUser.length = 0;
      vipUser.concat(this.form.vipUser);

      firstName.length = 0;
      firstName.concat(this.form.firstName);
    });
  };

  get settingInfo() {
    return this.$store.state.setting;
  }

  get userState() {
    return this.$store.state.user;
  }
}
</script>

<style scoped>
.el-input,
.el-select {
  width: 100%;
}
</style>
  