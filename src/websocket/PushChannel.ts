
export class PushChannel {

  socket: any;
  setIntervalWebsocketPush: any = null;
  reconnectionTimer: any;

  //websocketUrl = `ws://${window.location.host}/push-channel`;
  websocketUrl = `ws://localhost:7612/push-channel`;

  createSocket() {

    //this.socket && this.socket.close();
    if (!this.socket) {
      this.socket = new WebSocket(this.websocketUrl);
      this.socket.onopen = this.onopenWS;
      this.socket.onmessage = this.onmessageWS;
      this.socket.onerror = this.onerrorWS;
      this.socket.onclose = this.oncloseWS;
    }
  }

  /**打开WS之后发送心跳 */
  onopenWS = () => {
    clearInterval(this.reconnectionTimer);
    window.dispatchEvent(new CustomEvent('onopenWS', {
    }));

  }

  /**连接失败重连 */
  onerrorWS = () => {
    this.socket.close()
    clearInterval(this.setIntervalWebsocketPush)
  }

  /**WS数据接收统一处理 */
  onmessageWS = (e: any) => {
    window.dispatchEvent(new CustomEvent('onmessageWS', {
      detail: {
        data: e.data
      }
    }))
  }

  /**
   * 发送数据但连接未建立时进行处理等待重发
   * @param {any} message 需要发送的数据
   */
  connecting = (message: any) => {
    setTimeout(() => {
      if (this.socket.readyState === 0) {
        this.connecting(message)
      } else {
        this.socket.send(JSON.stringify(message))
      }
    }, 1000)
  }

  /**
   * 发送数据
   * @param {any} message 需要发送的数据
   */
  sendWSPush = (message: any) => {
    if (this.socket !== null && this.socket.readyState === 3) {
      this.socket.close()
      //this.createSocket()
    } else if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify(message))
    } else if (this.socket.readyState === 0) {
      this.connecting(message)
    }
  }

  /**断开重连 */
  oncloseWS = () => {
    const _this = this;
    _this.socket = null;
    clearInterval(_this.setIntervalWebsocketPush);
    _this.reconnectionTimer = setInterval(function () {
      _this.createSocket();
      console.log("relink")
    }, 3000);
    window.dispatchEvent(new CustomEvent('oncloseWS', {
    }));
  }

  /**发送心跳
   * @param {number} time 心跳间隔毫秒 默认5000
   * @param {string} ping 心跳名称 默认字符串ping
   */
  sendPing = (time = 30000, ping = 'ping') => {
    clearInterval(this.setIntervalWebsocketPush)
    this.socket.send(ping)
    this.setIntervalWebsocketPush = setInterval(() => {
      this.socket.send(ping)
    }, time);

  }

}