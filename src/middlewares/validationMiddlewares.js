// Common validation function
function validateRequestPart(reqPart, schema, req, next) {
    const { error, value } = schema.validate(reqPart);
    if (error) {
        const err = new Error(`error in request, ${error.details[0].message}`)
        err.statusCode = 400;
        next(err);
        return false; // Indicate validation failed
    }
    return value; // Return the validated value
}


const validateBody = (schema) => {
    return (req, res, next) => {
        const validatedBody = validateRequestPart(req.body, schema, req, next);
        if (validatedBody) {
            req.body = validatedBody;
            next();
        }
    };
};


const validateQueries = (schema) => {
    return (req, res, next) => {
        const validatedQuery = validateRequestPart(req.query, schema, req, next);
        if (validatedQuery) {
            req.query = validatedQuery;
            next();
        }
    };
};


const validateParams = (schema) => {
    return (req, res, next) => {
        const validatedParams = validateRequestPart(req.params, schema, req, next);
        if (validatedParams) {
            req.params = validatedParams;
            next();
        }
    };
};

module.exports = {
	validateBody,
	validateQueries,
	validateParams
};