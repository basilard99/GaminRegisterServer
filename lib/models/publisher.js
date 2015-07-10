function Publisher(name, webSite, code, isActive, description) {
	var _name = name;
	var _webSite = webSite;
	var _code = code;
	var _isActive = isActive;
	var _description = description;
	
	return {
		get name() { return _name; },
		set name(value) { _name = value; },
		
		get webSite() { return _webSite; },
		set webSite(value) { _webSite = value; },
		
		get code() { return _code; },
		set code(value) { _code = value; },
		
		get isActive() { return _isActive; },
		set isActive(value) { _isActive = value; },
		
		get description() { return _description; },
		set description(value) { _description = value; }
	}
};

module.exports.createPublisher = function(name, webSite, code, isActive, description) {
	if (!name) throw new Error('Name is undefined');
	
	return new Publisher(name, webSite, code, isActive, description);
};