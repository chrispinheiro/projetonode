exports.notFound = (req, res, next) => {
    //res.status = 404; //res.status(404); express?
    res.status(404);
    res.render('404'); 
};