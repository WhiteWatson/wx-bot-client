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
      ><el-row :gutter="10">
        <el-col :span="18">
          <el-form-item label="AI群聊">
            <el-select
              v-model="form.vipRoom"
              placeholder="请选择开启AI的群聊"
              multiple
              filterable
              allow-create
            >
              <el-option
                v-for="(room, i) in roomList"
                :key="i"
                :label="room.payload.topic"
                :value="room.payload.topic || room.payload.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="4">
          <el-button plain type="primary" @click="onRefreshRoomList"
            >刷新群聊列表</el-button
          >
        </el-col></el-row
      ><el-row :gutter="10">
        <el-col :span="18">
          <el-form-item label="AI私聊">
            <el-select
              v-model="form.vipUser"
              placeholder="请选择开启AI的单聊"
              multiple
              filterable
              allow-create
            >
              <el-option
                v-for="(room, i) in contactList"
                :key="i"
                :label="room.payload.name"
                :value="room.payload.name || room.payload.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="4">
          <el-button plain type="primary" @click="onRefreshContactList"
            >刷新联系人列表</el-button
          >
        </el-col>
      </el-row>
      <h4 class="mb-5">自动回复配置（正在开发，暂时不可用）：</h4>
      <el-row v-for="(replay, index) in replayArr" :key="index" :gutter="10">
        <el-col :span="10">
          <el-form-item :label="'问题-' + (index + 1)">
            <el-input v-model="replay.key"></el-input> </el-form-item></el-col
        ><el-col :span="10">
          <el-form-item :label="'回复-' + (index + 1)">
            <el-input v-model="replay.value"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button plain type="danger" @click.prevent="removeReplay(replay)"
            >删除</el-button
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="4" :offset="18">
          <el-button @click="addReplay">新增自定义回复</el-button></el-col
        >
      </el-row>
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
    this.onRefreshReplayArr(this.form.replayObj);
  }

  roomList: any[] = [];
  contactList: any[] = [];
  replayArr: any = [{ key: "", value: "" }];
  form = {
    singleChat: false,
    firstName: [],
    replayObj: {},
    vipRoom: [],
    vipUser: [],
  };

  onRefreshReplayArr = (obj: any) => {
    if (!obj) return;
    let arr = [];
    for (let key in obj) {
      if (obj.hasOwnProperty.call(obj, key)) {
        arr.push({ key: key, value: obj[key] });
      }
    }
    arr.forEach((item, index) => {
      this.$set(this.replayArr, index, item);
    });
  };

  onRefreshContactList = async () => {
    const list = await wxBot.Contact.findAll();
    this.contactList = [];
    list.forEach((item, index) => {
      this.$set(this.contactList, index, item);
    });
  };

  onRefreshRoomList = async () => {
    const list = await wxBot.Room.findAll();
    this.roomList = [];
    list.forEach((item, index) => {
      this.$set(this.roomList, index, item);
    });
  };

  removeReplay = (replay: any) => {
    var index = this.replayArr.indexOf(replay);
    if (index !== -1) {
      this.replayArr.splice(index, 1);
    }
  };
  addReplay = () => {
    let tmp = { key: "", value: "" };
    this.replayArr.push(tmp);
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
  