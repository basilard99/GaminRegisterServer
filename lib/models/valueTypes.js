'use strict';

var NameObj = function nameOperations(value) {

    if (!value) {
        throw('The name value must be defined and have a value');
    }

    if (value.length < 3) {
        throw('The name value must contain at least 3 characters');
    }

    if (value.length > 30) {
        throw('The name value cannot contain more than 3 characters');
    }

    var _name = value;

    Object.defineProperty(this, 'name', {
            get: function nameProperty() {
                return _name;
            }
        });

};

module.exports.createName = function createNameObj(value) {
    var name = new NameObj(value);
    return Object.freeze(name);
}
