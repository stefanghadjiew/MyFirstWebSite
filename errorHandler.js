const errorHandler = (err,req,res,next) => {
    return res.status(err.status || 500).json({
        err: {
            message: err.message || "Oops! Something went wrong ..."
        }
    })
}

module.exports = errorHandler;