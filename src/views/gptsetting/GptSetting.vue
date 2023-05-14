<template>
  <div class="gptsetting py-4 px-8">
    <form>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticEmail"
            value="email@example.com"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label"
          >Password</label
        >
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="submitForm">
        提交
      </button>
    </form>
  </div>
</template>
  
  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class GptSetting extends Vue {
  name = "";
  gender = "";

  submitForm = () => {
    console.log("提交表单", this.name, this.gender);
  };
}
</script>
  