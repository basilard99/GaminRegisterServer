'use strict';

var valueTypes = require('./valueTypes.js');

var PublisherObj = function definePublisher(name, webSite, code, isActive, description) {
    this._name = name;
    this._webSite = webSite;
    this._code = code;
    this._isActive = isActive;
    this._description = description;
};

Object.defineProperty(PublisherObj.prototype, 'name', {
    get: function getName() {
        return this._name.value;
    }
});

Object.defineProperty(PublisherObj.prototype, 'webSite', {
    get: function getWebSite() {
        return this._webSite.value;
    }
});

Object.defineProperty(PublisherObj.prototype, 'code', {
    get: function getCode() {
        return this._code.value;
    }
});

Object.defineProperty(PublisherObj.prototype, 'isActive', {
    get: function getIsActive() {
        return this._isActive.value;
    }
});

Object.defineProperty(PublisherObj.prototype, 'description', {
    get: function getDescription() {
        return this._description.value;
    }
});

module.exports.createPublisher = function createPublisher(name,
                                                          webSite,
                                                          code,
                                                          isActive,
                                                          description) {
    
    if (typeof isActive === 'string') {
        if (isActive.toLowerCase() === 'true') {
            isActive = true;
        }
        else if (isActive.toLowerCase() === 'false') {
            isActive = false;
        }
    }

    var pub = new PublisherObj(valueTypes.createName(name),
                               valueTypes.createUrl(webSite),
                               valueTypes.createPublisherCode(code),
                               valueTypes.createForcedBoolean(isActive),
                               valueTypes.createDescription(description));

    return Object.freeze(pub);

};
