export default ({ app }, inject) => {
  inject("execAction", (action) => {
    // data should parse like this
    // let parseData = {
    //   data : data, (actions array)
    //   action : action,(action key)
    //   params : params,(action data in case of post)
    //   callBack : callBack, (action callback after happen)
    // };
    let data = action.data.data;
    if (data !== undefined) {
      if (data.length > 0) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          let selectAction = data[i];
          if (selectAction.key === action.action) {
            switch (selectAction.method) {
              case "GET":
                app.$axios.get(selectAction.endpoint_url).then(() => {
                  if (action.callBack !== undefined) {
                    action.callBack();
                  }
                });
                break;
              case "POST":
                if (action.params === undefined) {
                  action.params = [];
                }
                app.$axios
                  .post(selectAction.endpoint_url, action.params)
                  .then(() => {
                    if (action.callBack !== undefined) {
                      action.callBack();
                    }
                  });
                break;
            }
            return;
          }
        }
      }
    }
    console.log("action array has problem , file plugins/actions.js", data);
    return false;
  });
};
