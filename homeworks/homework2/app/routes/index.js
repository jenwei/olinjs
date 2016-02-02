var home = function(req, res){
  res.render("home", {'classes': [
  {name:'Olin.js', teacher:'Sarah'},
  {name:'Bayesian', teacher:'Sanjoy'},
  {name:'FoCS', teacher:'Riccardo'}]
	});
};

module.exports.home = home;
