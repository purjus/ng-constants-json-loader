/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Vadim Loginov @vadimatp
*/
'use strict';

module.exports = function(source) {
    var data;
    var constantNames;
    var i;
    var output;
    var moduleName;
    var standalone;
    var env;
    try {
        data = JSON.parse(source);
    } catch (e) {
        this.emitError(this.resourcePath + ' must be a valid json object');
        return '';
    }
    moduleName = this.query.moduleName || 'constants';
    standalone = this.query.standalone !== false;
    env = this.query.env || 'local_dev';

    constantNames = Object.keys(data);
    if (!constantNames.length) {
        this.emitError(this.resourcePath + ' must be a valid json object');
    }
    output = '"use strict";export default angular.module("' + moduleName + '"' + (standalone ? ', []' : '') + ')';
    for (i in constantNames) {
        if (env === constantNames[i]) {
            output += '\n  .constant("' + constantNames[i][0] + '", ';
            output += JSON.stringify(data[constantNames[i][0]]);
            output += ')';
        }
    }

    output += ';';
    return output;
};
