/**
 * Yaml Brush for SyntaxHighlighter
 *
 * ppepin@rentpath.com
 * erik.wegner@ewus.de
 * davedartemik@gmail.com
 * 
 */
; (function () {
    typeof (require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush() {
        // Yaml Brush

        var constants = '~ true false on off';

        var regexLib = require('syntaxhighlighter-regex').commonRegExp;

        this.regexList = [
            { regex: regexLib.singleLinePerlComments, css: 'comments' },      // comment
            { regex: regexLib.doubleQuotedString, css: 'string' },        // double quoted string
            { regex: regexLib.singleQuotedString, css: 'string' },        // single quoted string
            { regex: /^\s*([a-z0-9\._-])+\s*:/gmi, css: 'variable' },      // key
            { regex: /\s?(\.)([a-z0-9\._-])+\s?:/gmi, css: 'comments' },      // section
            { regex: /\s(@|:)([a-z0-9\._-])+\s*$/gmi, css: 'variable bold' }, // variable, reference
            { regex: /\s+\d+\s?$/gm, css: 'color2 bold' },   // integers
            { regex: /(\{|\}|\[|\]|,|~|:)/gm, css: 'constants' },     // inline hash and array, comma, null
            { regex: /^\s+(-)+/gm, css: 'string bold' },   // array list entry
            { regex: /^---/gm, css: 'string bold' },   // category
            { regex: new RegExp(this.getKeywords(constants), 'gmi'), css: 'constants' }      // constants
        ];

        this.forHtmlScript(regexLib.phpScriptTags);
    }

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases = ['yaml', 'yml'];
    SyntaxHighlighter.brushes.Yaml = Brush;

    // CommonJS
    typeof (exports) != 'undefined' ? exports.Brush = Brush : null;

})();