/**
 *
 * Functions for matching values to criteria
 *
 *
 */

var TRIGGER_TYPE = "viewed_product";

// helper function for Array.includes
// Handles the cases where we are looking at inclusion of a value within
// an array, and the case where we are looking for inclusion of any of an
// array's values within an array.
var includes = function(anArray, value) {
  var i, j;

  if (Array.isArray(value)) {
    for (i = 0; i < anArray.length; i++) {
      for (j = 0; j < value.length; j++) {
        if (anArray[i].toString() === value[j]) {
          return true;
        }
      }
    }
  } else {
    for (i = 0; i < anArray.length; i++) {
      if (anArray[i].toString() === value.toString()) {
        return true;
      }
    }
  }
  return false;
};

/*
*
* Functions for checking operators.
* Each value should be a function taking the criteria value(s) and the operand
* value(s) and returning a boolean.
*
*/
var operators = {
  include_any: function(criteriaValues, operandValue) {
    return includes(criteriaValues, operandValue);
  },
  include_all: function(criteriaValues, operandValues) {
    for (var i = 0; i < criteriaValues.length; i++) {
      if (!includes(operandValues, criteriaValues[i])) {
        return false;
      }
    }
    return true;
  },
  less_than: function(criteriaValue, operandValue) {
    return operandValue < criteriaValue;
  },
  less_than_or_equal_to: function(criteriaValue, operandValue) {
    return operandValue <= criteriaValue;
  },
  equals: function(criteriaValue, operandValue) {
    return operandValue == criteriaValue;
  },
  greater_than_or_equal_to: function(criteriaValue, operandValue) {
    return operandValue >= criteriaValue;
  },
  greater_than: function(criteriaValue, operandValue) {
    return operandValue > criteriaValue;
  }
};

/**
 *
 * Evaluate the criteria against the product values to determine whether the
 * data should be sent back.
 */
var canSend = function(product_triggers, product) {
    var canSend = false;

    // Ensure arguments are sensible
    if (
      typeof product_triggers === "undefined" ||
      !product_triggers ||
      product === "undefined" ||
      !product
    ) {
      return false;
    }

    // For each of the product triggers, look at each of the criteria within
    // If any of them match then the data can be sent.
    for (var i = 0; i < product_triggers.length; i++) {
      var trigger = product_triggers[i];
      if (trigger.trigger_type === TRIGGER_TYPE) {
        var criterias = trigger.properties && trigger.properties.criteria;
        if (!Array.isArray(criterias) || !criterias.length) {
          canSend = true;
        } else {
          for (var j = 0; j < criterias.length; j++) {
            if (matches(criterias[j], product)) {
              canSend = true;
            }
          }
        }
      }
    }
    return canSend;
  },

  /**
   *
   * Determine whether a criteria matches the input value(s)
   *
   */
  matches = function(criteria, operand) {
    // If no criteria or operand supplied, return false
    if (!operand || typeof operand === "undefined") {
      return false;
    }
    if (!criteria || typeof criteria === "undefined") {
      return false;
    }

    // If no value, attribute, or known operator on criteria, return false
    var operator = criteria.operator;

    if (operator === "all") {
      return true;
    }

    if (!operators[operator]) {
      return false;
    }

    var criteriaValue = criteria.value;
    if (typeof criteriaValue === "undefined") {
      return false;
    }

    var attribute = criteria.attribute;
    if (typeof operand[attribute] === "undefined") {
      return false;
    }

    var operandValue = operand[attribute];
    if (typeof operandValue === "string") {
      // TODO: Bug: If a value (think title) has a comma in it, we don't want to split into an array
      operandValue = operandValue.split(",");
    }

    // Run the function associated with the operator
    return operators[operator](criteriaValue, operandValue);
  };

module.exports = {
  canSend: canSend,
  matches: matches
};
