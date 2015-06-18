function Publisher(name, webSite, code, isActive, description) {
	var _name = name;
	var _webSite = webSite;
	var _code = code;
	var _isActive = isActive;
	var _description = description;
	
	return {
		getName: function() { return _name; },
		setName: function(newName) { _name = newName; },
		
		getWebSite: function() { return _webSite; },
		setWebSite: function(newWebSite) { _webSite = newWebSite; },
		
		getCode: function() { return _code; },
		setCode: function(newCode) { _code = newCode; },
		
		getIsActive: function() { return _isActive; },
		setIsActive: function(newIsActive) { _isActive = newIsActive; },
		
		getDescription: function() { return _description; },
		setDescription: function(newDescription) { _description = newDescription; }
	}
};

module.exports.createPublisher = function(name, webSite, code, isActive, description) {
	return new Publisher(name, webSite, code, isActive, description);
};