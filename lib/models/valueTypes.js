'use strict';

var NameObj = function defineName(value) {

    if (!value) {
        throw new Error('The name value must be defined and have a value');
    }

    if (typeof value !== 'string') {
        throw new Error('The name value must be defined and be a string');
    }

    if (value.length < 3) {
        throw new Error('The name value must contain at least 3 characters');
    }

    if (value.length > 30) {
        throw new Error('The name value cannot contain more than 30 characters');
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
        throw new Error('The url value must be defined and have a value');
    }

    if (typeof value !== 'string') {
        throw new Error('The url value must be defined and be a string');
    }

    if (value.length === 0) {
        throw new Error('The url value must contain at least 3 characters');
    }

    // Created from https://gist.github.com/searls/1033143
    var p = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;//eslint-disable-line max-len
    if (!p.exec(value)) {
        throw new Error('The url value must be a valid url');
    }

    var _url = value;

    Object.defineProperty(this, 'value', {
        get: function urlProperty() {
            return _url;
        }
    });

};

var PublisherCodeObj = function definePublisherCode(value) {

    if (!value) {
        throw new Error('The publisher code value must be defined and have a value');
    }

    if (typeof value !== 'string') {
        throw new Error('The publisher code value must be defined and be a string');
    }

    if (value.length < 2) {
        throw new Error('The publisher code value must contain at least 3 characters');
    }

    if (value.length > 6) {
        throw new Error('The publisher code value cannot contain more than 6 characters');
    }

    var _publisherCode = value;

    Object.defineProperty(this, 'value', {
            get: function publisherCodeProperty() {
                return _publisherCode;
        }
    });

};

var ForcedBooleanObj = function defineForcedBoolean(value) {

    if (!value && typeof value !== 'boolean') {
        throw new Error('The boolean value must be defined and have a value');
    }

    if (typeof value !== 'boolean') {
        throw new Error('The boolean value must be defined and have a true/false value');
    }

    var _forcedBoolean = value;

    Object.defineProperty(this, 'value', {
            get: function booleanProperty() {
                return _forcedBoolean;
        }
    });

};

var DescriptionObj = function defineDescription(value) {

    if (!value) {
        value = '';
    }

    if (typeof value !== 'string') {
        throw new Error('The description value must be defined and be a string');
    }

    if (value.length > 500) {
        throw new Error('The description value cannot contain more than 500 characters');
    }

    var _description = value;

    Object.defineProperty(this, 'value', {
        get: function descriptionProperty() {
            return _description;
        }
    });

};

var BookCodeObj = function defineBookCode(value) {

    if (!value) {
        throw new Error('The book code value must be defined and have a value');
    }

    if (typeof value !== 'string') {
        throw new Error('The book code value must be defined and be a string');
    }

    if (value.length < 2) {
        throw new Error('The book code value must contain at least 3 characters');
    }

    if (value.length > 30) {
        throw new Error('The book code value cannot contain more than 30 characters');
    }

    var _bookCode = value;

    Object.defineProperty(this, 'value', {
        get: function bookCodeProperty() {
            return _bookCode;
        }
    });
};

var MoneyObj = function defineMoney(value) {

    if (!value && typeof value !== 'number') {
        throw new Error('The money value must be defined and have a value');
    }

    if (typeof value !== 'number') {
        throw new Error('The money value must be defined and be a number');
    }

    if (value < 0) {
        throw new Error('The money value must be between 0 and 1000');
    }

    if (value > 1000) {
        throw new Error('The money value must be between 0 and 1000');
    }

    var _money = value;

    Object.defineProperty(this, 'value', {
            get: function moneyProperty() {
                return _money;
        }
    });

};

var PublisherUriObj = function definePublisherUri(value) {
    
    var publisherUriRegex = /\/publishers\/[a-zA-Z0-9]{3,6}/;
    if (!value.match(publisherUriRegex)) {
        throw new Error('The publisher URI is not valid')
    }
    
    var _publisherUri = value;
    
    Object.defineProperty(this, 'value', {
        get: function publisherUriProperty() {
            return _publisherUri;
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

module.exports.createPublisherCode = function createPublisherCodeObj(value) {
    var publisherCode = new PublisherCodeObj(value);
    return Object.freeze(publisherCode);
};

module.exports.createForcedBoolean = function createForcedBooleanObj(value) {
    var forcedBoolean = new ForcedBooleanObj(value);
    return Object.freeze(forcedBoolean);
};

module.exports.createDescription = function createDescription(value) {
    var description = new DescriptionObj(value);
    return Object.freeze(description);
};

module.exports.createBookCode = function createBookCodeObj(value) {
    var bookCode = new BookCodeObj(value);
    return Object.freeze(bookCode);
};

module.exports.createMoney = function createMoneyObj(value) {
    var money = new MoneyObj(value);
    return Object.freeze(money);
};

module.exports.createPublisherUri = function createPublisherUriObj(value) {
    var publisherUri = new PublisherUriObj(value);
    return Object.freeze(publisherUri);
};

module.exports.BookTypeEnum = {
    RPG: 1,
    WarGame: 2
};
