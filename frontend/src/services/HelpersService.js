import _ from "lodash";

export function toSentence(phrases) {
  return phrases.join(" and ");
}

export function humanizeErrors(errors) {
  return (
    _.map(errors, (es, field) => {
      let fieldHumanized = field[0].toUpperCase() + field.substring(1);
      if (field === "base") {
        fieldHumanized = undefined;
      }
      return _.compact([fieldHumanized, toSentence(es)]).join(" ");
    }).join(". ") + "."
  );
}

export function mapErrors(fields, errors) {
  let markInvalid = (elm, error) => {
    elm.classList.add("is-invalid");
    elm.nextSibling.innerHTML = error;
  };
  let clearInvalid = elm => elm.classList.remove("is-invalid");

  _.each(fields, clearInvalid);
  _.each(errors, (es, field) => markInvalid(fields[field], toSentence(es)));
}

export function arrayMove(arr, previousIndex, newIndex) {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}
