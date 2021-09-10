
export interface PushChannelEvent<T> {
  eventId: string;
  code: EventCode;
  event: string;
  description: string;
  sender: string;
  recipient: string;
  data: T;
}

export enum EventCode {
  CLIENT_HEARTBEAT = 1000,
  GET_SERVER_CONFIG = 10001,
  PUSH_REQUEST_INFO = 10002,
  CLIENT_SET_RESPONSE_DATA = 10003,
  CREATE_API_INTERFACE = 11001,

  UNKNOWN = 1

}
