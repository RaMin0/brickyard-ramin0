import _ from "lodash";

export function humanizeErrors(errors) {
  return (
    _.map(errors, (es, field) => {
      let fieldHumanized = field[0].toUpperCase() + field.substring(1);
      return fieldHumanized + " " + toSentence(es);
    }).join(". ") + "."
  );
}

export function toSentence(phrases) {
  return phrases.join(", ");
}

export function mapErrors(fields, errors) {
  _.each(errors, (es, field) => {
    let elm = fields[field];
    elm.classList.add("is-invalid");
    elm.nextSibling.innerHTML = toSentence(es);
  });
}
