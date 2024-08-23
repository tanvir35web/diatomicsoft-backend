function errorHandleFormater(req, res, errors) {
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

        return res.status(422).json({
            message: summaryMessage,
            errors: groupedErrors,
        });
    }
}

module.exports = { errorHandleFormater };