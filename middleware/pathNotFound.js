const notFound = (req,res) => {
    res.status(404).json({
        statusCode:404,
        message:'Path Not Found'
    })
}

module.exports = notFound