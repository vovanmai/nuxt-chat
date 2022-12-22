<template>
  <el-container>
    <el-header style="background: red">Header</el-header>
    <el-container style="height: 100vh">
      <el-aside style="background: yellow;">
      </el-aside>
      <el-container>
        <el-main style="height: 100vh">
          <div style="background: blue; height: 80%; overflow-y: scroll">
            <div>message</div>
            <div>message</div>
            <div>message</div>
            <div>message</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  transition: 'home',
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
<style>
  body {
    overflow-y: hidden;
  }
  .el-main {
    padding: 0px;
  }

  .el-header {
    height: 80px !important;
  }
</style>

