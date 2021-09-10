<template>
  <div class="dashboard">
    <el-container>
      <el-header :class="heardStyle"
        ><div>
          Mock Server
          <div class="header-right">{{ linkState }}</div>
        </div></el-header
      >
      <el-container>
        <el-aside width="400px">
          <el-card class="box-card">
            <el-input
              placeholder="search url"
              v-model="searchUrlInputData"
              @input="filterUrlData()"
            ></el-input>
            <div
              class="requestListBox"
              v-for="request in filterList"
              :key="request.timestamp"
            >
              <el-tag
                :type="getRequestStyleTag(request.method)"
                size="small"
                effect="dark"
                >{{ request.method }}</el-tag
              >

              <el-link class="request-link" @click="linkClick(request)"
                >{{ request.url
                }}{{
                  request.parameter ? "?" + request.parameter : ""
                }}</el-link
              >
              <br />
            </div>
          </el-card>

          <el-card>
            <h5>服务器响应设置</h5>
            <el-button @click="sendSetResponseData" type="primary" size="small"
              >设置服务响应内容:JSON</el-button
            >
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 20 }"
              placeholder="响应内容"
              v-model="responseData"
            >
            </el-input>
          </el-card>
        </el-aside>

        <el-main>
          <el-card>
            <h5>请求JSON参数</h5>
            <el-input type="textarea" v-model="requestViewBox" placeholder="">
            </el-input>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.header-right {
  float: right;
}

.el-header-success {
  background-color: #6ad15c;
  color: #333;
  line-height: 60px;
}

.el-header-fail {
  background-color: #e22d27;
  color: #333;
  line-height: 60px;
}

.requestListBox {
  margin: 5px;
}

.container-auto {
  height: 500px;
}

.el-aside {
  color: #333;
}

.request-link {
  margin: 5px;
}
</style>

<script lang="ts">
import dashboard from "./dashboard";
export default dashboard;
</script>
