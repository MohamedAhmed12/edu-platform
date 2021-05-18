export default ({ app }, inject) => {
  inject("getAction", (action) => {
    let data = undefined;
    if (action.data !== undefined && action.data.actions !== undefined) {
      data = action.data.actions.data;
    }
    if (data === undefined && action.actions !== undefined) {
      data = action.actions.data;
    }

    if (data !== undefined) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          let selectAction = data[i];
          if (selectAction.key === action.key) {
            return selectAction.endpoint_url;
          }
        }
      }
    }
    console.log("not found action link, file plugins/getAction.js", data);
    return "";
  });
};
