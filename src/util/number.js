/**
 * 数值处理模块
 * @module echarts/util/number
 */

define(function (require) {

    function _trim(str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    /**
     * Linear mapping a value from domain to range
     * @memberOf module:echarts/util/number
     * @param  {number} val
     * @param  {Array.<number>} domain Domain extent
     * @param  {Array.<number>} range  Range extent
     * @param  {boolean} clamp
     * @return {number}
     */
    function linearMap (val, domain, range, clamp) {
        var sub = domain[1] - domain[0];

        if (sub === 0) {
            return domain[0];
        }
        var t = (val - domain[0]) / sub;
        if (clamp) {
            t = Math.min(Math.max(t, 0), 1);
        }
        return t * (range[1] - range[0]) + range[0];
    };

    /**
     * Convert a percent string to absolute number.
     * Returns NaN if percent is not a valid string or number
     * @memberOf module:echarts/util/number
     * @param {string|number} percent
     * @param {number} all
     * @return {number}
     */
    function parsePercent(percent, all) {
        switch (percent) {
            case 'center':
                percent = '50%';
                break;
            case 'left':
            case 'top':
                percent = '0%';
                break;
            case 'right':
            case 'bottom':
                percent = '100%';
                break;
        }
        if (typeof percent === 'string') {
            if (_trim(percent).match(/%$/)) {
                return parseFloat(percent) / 100 * all;
            }

            return parseFloat(percent);
        }

        return +percent;
    }

    /**
     * Normalize css liked array configuration
     * e.g.
     *  3 => [3, 3, 3, 3]
     *  [4, 2] => [4, 2, 4, 2]
     *  [4, 3, 2] => [4, 3, 2, 3]
     * @param {number|Array.<number>} val
     */
    function normalizeCssArray(val) {
        var len = val.length;
        if (typeof (val) === 'number') {
            return [val, val, val, val];
        }
        else if (len === 2) {
            // vertical | horizontal
            return [val[0], val[1], val[0], val[1]];
        }
        else if (len === 3) {
            // top | horizontal | bottom
            return [val[0], val[1], val[2], val[1]];
        }
        return val;
    }

    /**
     * 每三位默认加,格式化
     * @type {string|number} x
     */
    function addCommas(x) {
        if (isNaN(x)) {
            return '-';
        }
        x = (x + '').split('.');
        return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,'$1,')
               + (x.length > 1 ? ('.' + x[1]) : '');
    }

    /**
     * Fix rounding error of float numbers
     */
    function round(x) {
        // PENDING
        return +(+x).toFixed(12);
    }

    return {

        linearMap: linearMap,

        parsePercent: parsePercent,

        normalizeCssArray: normalizeCssArray,

        addCommas: addCommas,

        round: round
    };
});