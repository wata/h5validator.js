/**
 * validate.js
 * http://wata.github.io/validate.js
 * (c) wata, MIT License.
 */

(function($){
    'use strict';

    // Validate CLASS DEFINITION
    // =========================

    var Validate = function(el, opts){
        var that = this;

        that.$form = $(el),
        that.opts = opts;

        !that.$form.attr('novalidate') && that.$form
            .on(that.opts.events, $.proxy(that.check, that));
    };

    Validate.DEFAULTS = {
        validClass  : 'valid',
        invalidClass: 'invalid',
        events      : 'change',

        // http://www.wufoo.com/html5/#types
        // email / url / number / date
        typeRules   : ['email', 'url', 'number', 'date'],

        // http://www.wufoo.com/html5/#attributes
        // required / maxlength / pattern / min / max / step
        attrRules   : ['required', 'maxlength', 'pattern', 'min', 'max', 'step']
    };

    Validate.prototype.check = function(event){
        var that = this, $target = $(event.target), val = $target.val(),
            rules = that.getRules(event.target), isValid = true, result = {};

        $.each(rules, function(rule, param){
            result[rule] = that[rule].call(that, val, param);
            if (!result[rule]) isValid = false;
        });

        var e = $.Event('check.validate', {
            relatedTarget: $target,
            result       : result,
            isValid      : isValid
        });
        that.$form.trigger(e);
        if (e.isDefaultPrevented()) return;

        $target
            .removeClass(that.opts.validClass)
            .removeClass(that.opts.invalidClass)
            .addClass(isValid ? that.opts.validClass : that.opts.invalidClass);
    };

    Validate.prototype.getRules = function(obj){
        var that = this, $el = $(obj), rules = {};

        $.each(that.opts.typeRules, function(i, rule){
            $el.attr('type') == rule && (rules[rule] = rule);
        });

        $.each(that.opts.attrRules, function(i, rule){
            $el.attr(rule) && (rules[rule] = $el.attr(rule));
        });

        return rules;
    };

    Validate.prototype.email = function(val){
        // http://projects.scottsplayground.com/email_address_validation/
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(val);
    };

    Validate.prototype.url = function(val){
        // http://projects.scottsplayground.com/iri/
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
    };

    Validate.prototype.number = function(val){
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(val);
    };

    Validate.prototype.date = function(val){
        return !/Invalid|NaN/.test(new Date(val).toString());
    };

    Validate.prototype.required = function(val){
        return $.trim(val).length > 0;
    };

    Validate.prototype.maxlength = function(val, maxlength){
        return $.trim(val).length <= maxlength;
    };

    Validate.prototype.pattern = function(val, pattern){
        return pattern.test(val);
    };

    Validate.prototype.min = function(val, min){
        return val >= min;
    };

    Validate.prototype.max = function(val, max){
        return val <= max;
    };

    Validate.prototype.step = function(val, step){
        // http://stackoverflow.com/questions/12899340/validate-html5-number-input-with-a-step-of-0-1
        return Math.abs((Math.round(val / step) * step) - val) > 0.00001;
    };

    // Validate PLUGIN DEFINITION
    // ===========================

    $.fn.validate = function(opt){
        return this.each(function(){
            var opts = $.extend({}, Validate.DEFAULTS, typeof opt == 'object' && opt);
            new Validate(this, opts);
        });
    };

    $.fn.validate.Constructor = Validate;

    // Validate DATA-API
    // ===========================

    $(window).on('load', function(){
        $('.js-validate').each(function(){
            var $form = $(this);
            $form.validate($form.data());
        })
    })

})(jQuery);