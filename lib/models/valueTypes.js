'use strict';

var NameObj = function defineName(value) {

    if (!value) {
        throw 'The name value must be defined and have a value';
    }

    if (typeof value !== 'string') {
        throw 'The name value must be defined and be a string';
    }

    if (value.length < 3) {
        throw 'The name value must contain at least 3 characters';
    }

    if (value.length > 30) {
        throw 'The name value cannot contain more than 30 characters';
    }

    var _name = value;

    Object.defineProperty(this, 'value', {
        get: function nameProperty() {
            return _name;
        }
    });

};

var UrlObj = function defineUrl(value) {

    if (!value) {
        throw 'The url value must be defined and have a value';
    }

    if (typeof value !== 'string') {
        throw 'The url value must be defined and be a string';
    }

    if (value.length === 0) {
        throw 'The url value must contain at least 3 characters';
    }

    // Created from https://gist.github.com/searls/1033143
    var p = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
    if (!p.exec(value)) {
        throw 'The url value must be a valid url';
    }

    var _url = value;

    Object.defineProperty(this, 'value', {
        get: function urlProperty() {
            return _url;
        }
    });

};

var CodeObj = function defineCode(value) {

    if (!value) {
        throw 'The code value must be defined and have a value';
    }

    if (typeof value !== 'string') {
        throw 'The code value must be defined and be a string';
    }

    if (value.length < 2) {
        throw 'The code value must contain at least 3 characters';
    }

    if (value.length > 6) {
        throw 'The code value cannot contain more than 6 characters';
    }

    var _code = value;

    Object.defineProperty(this, 'value', {
            get: function codeProperty() {
                return _code;
        }
    });

};

var IsActiveObj = function defineIsActive(value) {

    if (!value && typeof value !== 'boolean') {
        throw 'The isActive value must be defined and have a value';
    }

    if (typeof value !== 'boolean') {
        throw 'The isActive value must be defined and have a true/false value';
    }

    var _isActive = value;

    Object.defineProperty(this, 'value', {
            get: function isActiveProperty() {
                return _isActive;
        }
    });

};

var DescriptionObj = function defineDescription(value) {

    if (!value) {
        value = '';
    }

    if (typeof value !== 'string') {
        throw 'The description value must be defined and be a string';
    }

    if (value.length > 500) {
        throw 'The description value cannot contain more than 500 characters';
    }

    var _description = value;

    Object.defineProperty(this, 'value', {
        get: function descriptionProperty() {
            return _description;
        }
    });

};

module.exports.createName = function createNameObj(value) {
    var name = new NameObj(value);
    return Object.freeze(name);
};

module.exports.createUrl = function createUrlObj(value) {
    var url = new UrlObj(value);
    return Object.freeze(url);
};

module.exports.createCode = function createCodeObj(value) {
    var code = new CodeObj(value);
    return Object.freeze(code);
};

module.exports.createIsActive = function createIsActiveObj(value) {
    var isActive = new IsActiveObj(value);
    return Object.freeze(isActive);
};

module.exports.createDescription = function createDescription(value) {
    var description = new DescriptionObj(value);
    return Object.freeze(description);
};
