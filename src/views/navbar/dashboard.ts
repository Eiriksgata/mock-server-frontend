
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Prism from 'prismjs';

import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import { PushChannel } from "@/websocket/PushChannel";
import { EventCode, PushChannelEvent } from "@/api/PushEvent";

@Component({ components: {} })
export default class ViewDashboard extends Vue {
  responseData: string = '{"code":0,"message":"Operation Success"}';

  requestViewBox = '';

  showRenderBox = false;

  updateResponseLoading = true;

  socket: PushChannel = new PushChannel();

  requestList: any = [];

  searchUrlInputData = '';

  filterList: any = this.requestList;

  linkState: string = '连接已断开';

  heardStyle: string = 'el-header-fail';

  mounted() {
    this.initPushLink();
  }

  filterUrlData() {
    this.filterList = [];
    const _this = this;
    this.requestList.forEach(function (value: any) {
      const url = value.uri + '?' + value.parameter;
      if (new RegExp(_this.searchUrlInputData).test(url)) {
        _this.filterList.push(value);
      }
    });
  }



  initPushLink() {
    this.socket.createSocket();
    const _this = this;
    window.addEventListener('onopenWS', function (event: any) {
      _this.heardStyle = "el-header-success";
      _this.linkState = '连接中';
    }, false);

    window.addEventListener('onmessageWS', function (event: any) {
      //判断repose是否正确
      const reposeData = JSON.parse(event.detail.data);
      if (reposeData.code === 10002) {
        _this.requestList.push(reposeData.data);
      }
    }, false);

    window.addEventListener('oncloseWS', function (event: any) {
      _this.heardStyle = "el-header-fail";
      _this.linkState = '连接已断开';
    }, false);
    // 路由跳转时结束websocket链接
    this.$router.afterEach(function () {

      _this.socket.socket.close();
    });
  }

  updateResponseDataSet() {
    this.showRenderBox = true;
    const result = prettier.format(this.responseData, {
      parser: "json",
      plugins: [parserBabel],
      endOfLine: 'auto'
    });
    console.log(result);
    this.responseData = result + "";
    setInterval(function () {
      Prism.highlightAll();
    }, 50);
  }

  sendSetResponseData() {
    const sendData: PushChannelEvent<String> = {
      code: EventCode.CLIENT_SET_RESPONSE_DATA,
      event: 'CLIENT_SET_RESPONSE_DATA',
      eventId: new Date().getTime() + '',
      description: '',
      sender: 'Client',
      recipient: 'Server',
      data: this.responseData
    };
    this.socket.sendWSPush(sendData);
    this.$notify({
      title: 'success',
      type: 'success',
      message: '设置成功'
    });
  }



  linkClick(value: any) {
    this.requestViewBox = prettier.format(JSON.stringify(JSON.parse(value.requestBody)), {
      parser: "json",
      plugins: [parserBabel],
      endOfLine: 'auto'
    });
  }


  getRequestStyleTag(method: string) {
    switch (method) {
      case 'GET':
        return '';
      case 'POST':
        return 'warning';
      default:
        return 'info';
    }
  }




}