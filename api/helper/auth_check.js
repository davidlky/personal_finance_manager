module.exports = isAuthenticated;

function isAuthenticated(req,res,next){
	if (req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}