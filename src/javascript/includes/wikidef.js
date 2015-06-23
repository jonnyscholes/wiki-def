var WIKI_API_URL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages|revisions|info&redirects=true&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=300&rvprop=timestamp&inprop=watched&indexpageids=true';
var currentAnchor = null;

module.exports = function(selector) {
	var els = document.querySelectorAll(selector);
	Array.prototype.forEach.call(els, function(el, i){
		el.addEventListener('mouseover', onHover);

	})
};

function onHover(e) {
	getJSONP(WIKI_API_URL + '&titles=' + e.target.innerHTML.replace(/ /g, '-') + '&callback=onResponse');
	currentAnchor = e.target;
}

function onResponse(data) {
	console.log(data.query.pages[data.query.pageids[0]]);
}

// @hack: because browserify puts all our code in it's own context the callback needs to be made global so it can be found
window.onResponse = onResponse;

function getJSONP(url) {
	var script = document.createElement('script');
	script.src = url

	document.getElementsByTagName('head')[0].appendChild(script);
}