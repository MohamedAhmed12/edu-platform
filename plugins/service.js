export default ({ app, $auth }, inject) => {
  inject("getList", (sub, data) => {
    let result = [];
    data.data[0].relationships[sub].data.forEach((obj) => {
      result.push(getDataByType(obj.type, obj.id, data.included));
    });
    return result;
  });

  inject("formatter", ({ data, included }) => {
    return data.map((item) => {
      let actions = item.relationships.actions.data;

      actions = actions.map((action) => {
        action.included = included.find((inc) => {
          if (inc.type === action.type && inc.id === action.id) {
            return inc.attributes;
          }
        });

        return action;
      });

      delete item.relationships;
      item.actions = actions;
      return item;
    });
  });

  inject("getFromDataByType", (type, response) => {
    let result = [];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].type === type) {
        result.push(getActions(response.data[i], response.included));
      }
    }
    return result;
  });

  inject("getOne", (type, response) => {
    return getActions(response.data, response.included);
  });

  inject("getIncludedByType", (type, included) => {
    let result = [];
    for (let i = 0; i < included.length; i++) {
      if (included[i].type === type) {
        result.push(getDataByType(included[i].type, included[i].id, included));
      }
    }
    return result;
  });

  inject("getByType", (sub, included) => {
    let type = $auth.user.attributes.type;
    //let sub = type == 'student' ? 'parents' : 'children';
    let result = [];
    for (let i = 0; i < included.length; i++) {
      if (included[i].type === type) {
        //console.log(included[i])
        if (typeof included[i].relationships[sub] !== typeof undefined) {
          included[i].relationships[sub].data.forEach((obj) => {
            result.push(getDataByType(obj.type, obj.id, included));
          });
        }
      }
    }
    return result;
  });

  function getDataByType(type, id, included) {
    for (let i = 0; i < included.length; i++) {
      if (included[i].type === type && included[i].id === id) {
        return getActions(included[i], included);
        /*
                included[i].actions = []
                if(typeof included[i].relationships !== typeof undefined){
                    if(typeof included[i].relationships.actions !== typeof undefined){
                        for (let k=0; k<included[i].relationships.actions.data.length;k++) {
                            included[i].actions.push(getDataByType(included[i].relationships.actions.data[k].type,included[i].relationships.actions.data[k].id,included))
                        }
                    }
                }
                return included[i]
                */
      }
    }
    return {};
  }

  function getActions(item, included) {
    item.actions = [];
    if (typeof item.relationships !== typeof undefined) {
      if (typeof item.relationships.actions !== typeof undefined) {
        for (let k = 0; k < item.relationships.actions.data.length; k++) {
          item.actions.push(
            getDataByType(
              item.relationships.actions.data[k].type,
              item.relationships.actions.data[k].id,
              included
            )
          );
        }
      }
    }
    return item;
  }

  inject("hasAction", (key, row) => {
    if (typeof row.actions !== typeof undefined) {
      for (let i = 0; i < row.actions.length; i++) {
        if (row.actions[i].attributes.key === key) return row.actions[i];
      }
    }
    return false;
  });
};
