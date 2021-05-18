import { Formatter } from "sarala-json-api-data-formatter";

export default (_, inject) => {
  inject("formatter", (_) => new Formatter());
};
