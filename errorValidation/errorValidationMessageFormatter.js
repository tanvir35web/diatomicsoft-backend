const { body, validationResult } = require('express-validator');


function errorValidationMessageFormatter(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const groupedErrors = errors.array().reduce((acc, err) => {
        if (!acc[err.path]) {
          acc[err.path] = [];
        }
        acc[err.path].push(err.msg);
        return acc;
      }, {});
  
      const firstErrorMessage = errors.array()[0].msg;
      const additionalErrorsCount = errors.array().length - 1;
      const summaryMessage = additionalErrorsCount > 0
        ? `${firstErrorMessage} (and ${additionalErrorsCount} more error${additionalErrorsCount > 1 ? 's' : ''})`
        : firstErrorMessage;
  
      res.status(422).json({
        message: summaryMessage,
        errors: groupedErrors,
      });
      return true; // Indicate that an error response was sent
    }
    return false; // No errors, proceed with the next steps
  }

  module.exports = { errorValidationMessageFormatter };
  