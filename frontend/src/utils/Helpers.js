import _ from "lodash";

export function humanizeErrors(errors) {
  return (
    _.map(errors, (es, field) => {
      let fieldHumanized = field[0].toUpperCase() + field.substring(1);
      return fieldHumanized + " " + es.join(", ");
    }).join(". ") + "."
  );
}
