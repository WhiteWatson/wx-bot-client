<template>
  <div class="gptsetting py-4 px-8">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="开启单聊">
        <el-switch v-model="form.singleChat"></el-switch>
      </el-form-item>
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
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { wxBot } from "@/bot";

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

  // onSubmit = () => {};

  get settingInfo() {
    return this.$store.state.setting;
  }

  get userState() {
    return this.$store.state.user;
  }
}
</script>
  