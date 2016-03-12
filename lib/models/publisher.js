'use strict';

var valueTypes = require('./valueTypes.js');

var PublisherObj = function definePublisher(name, webSite, code, isActive, description) {
	var _name = name;
	var _webSite = webSite;
	var _code = code;
	var _isActive = isActive;
	var _description = description;

    Object.defineProperty(this, 'name', {
        get: function nameProperty() {
            return _name.name;
        }
    });

    Object.defineProperty(this, 'webSite', {
        get: function webSiteProperty() {
            return _webSite.url;
        }
    });

    Object.defineProperty(this, 'code', {
        get: function codeProperty() {
            return _code.code;
        }
    });

    Object.defineProperty(this, 'isActive', {
        get: function isActiveProperty() {
            return _isActive.isActive;
        }
    });

    Object.defineProperty(this, 'description', {
        get: function nameProperty() {
            return _description.description;
        }
    });

};

module.exports.createPublisher = function createPublisher(name,
														  webSite,
														  code,
														  isActive,
														  description) {
	var pub = new PublisherObj(valueTypes.createName(name),
							   valueTypes.createUrl(webSite),
							   valueTypes.createCode(code),
							   valueTypes.createIsActive(isActive),
							   valueTypes.createDescription(description));
	return Object.freeze(pub);
};
