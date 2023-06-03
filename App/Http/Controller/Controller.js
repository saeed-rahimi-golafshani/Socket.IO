const authobond = require("auto-bind");

module.exports = class Controller{
    constructor() {
        authobond(this);
    }
}