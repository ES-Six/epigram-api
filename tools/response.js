module.exports = {
    success_response: (h, result, message, code) => (
        h.response({
            result,
            message,
            statusCode: code
        }).code(code)
    )
};