<template>
  <div class="wrap" style="background: gray; height: 100vh; display: flex; flex-direction: column">
    <div class="header" style="padding: 20px; background: green">
      header
    </div>
    <div class="main-and-sidebar" style="background: rebeccapurple; flex:1; display: flex; overflow-y: hidden">
      <div class="side-bar" style="width: 30%; background: purple">
        <div style="background: #1890ff; padding: 20px;">infor</div>
        <div style="overflow-y: auto">
          <div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div>
          <div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div><div style="padding: 20px; background: yellow; margin-bottom: 2px">
            1
          </div>
        </div>
      </div>
      <div class="main" style="width: 70%;">
        123
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    };
  },
  created() {
  },
  mounted() {

  }
}
</script>


