// 400 Bad Request //401 = unauthorised // 403 Forbidden
module.exports = function (req, res, next) {
    if (!req.customer.isAdmin) return res.status(403).send('Acces Denied');
    next();
}