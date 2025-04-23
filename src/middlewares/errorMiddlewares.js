
const errorHandler = (err, req, res, next) => {
	// Log to console for dev
	console.error(err);

	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || 'Server Error'
	});
};

module.exports = {
	errorHandler
}