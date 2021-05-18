let JSONAPISerializer = require("jsonapi-serializer").Serializer;
let JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

export default class jsonapi {
  static serialize(type, opts, data) {
    return new JSONAPISerializer(type, opts).serialize(data);
  }

  static deserialize(opts, data, callback) {
    return new JSONAPIDeserializer(opts).deserialize(data, callback);
  }
}
