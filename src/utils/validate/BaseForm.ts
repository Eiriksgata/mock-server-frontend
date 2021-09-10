
export const ipValidatePass = (rule: any, value: string, callback: any) => {
  if (/^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/g.test(value)) {
    callback();
  } else {
    callback(new Error('validate.ip'));
  }
}
