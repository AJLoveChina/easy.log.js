let __stackCacheMap = {};
let __stackidList = [];
let stackLimit = 1000;
let id = 1;
let isSaveStack = true;
let isEnableLog = true;


function getstack(stackid) {
    return function () {
        return __stackCacheMap[stackid];
    }
}

function savestack(stackid, stack) {
    __stackidList.push(stackid);
    __stackCacheMap[stackid] = stack;

    if (__stackidList.length > stackLimit) {
        let tag = __stackidList.shift();
        delete __stackCacheMap[tag];
    }
}

function generateArguments(args, _isSaveStack) {

    let list = [];
    let stackid = `log-${args[0]}-${id}`;

    list.push(...args);
    list.push({fn: getstack(stackid)});

    if (_isSaveStack === true || (isSaveStack && _isSaveStack === undefined)) {
        savestack(stackid, new Error("stack").stack);
    }
    id++;
    return list;
}

let Factory = function (groupname) {
    if (this instanceof Factory) {
        this._isSaveStack = undefined;
        this._isEnableLog = undefined;

        let that = this;
        let fn = function () {
            if (that._isEnableLog === true || (isEnableLog && that._isEnableLog === undefined)) {
                console.log(groupname, ...generateArguments(arguments, that._isSaveStack));
            }
        };

        let list = ['log', 'info', 'warn', 'error'];

        list.forEach(k => {
            fn[k] = function () {
                if (that._isEnableLog === true || (isEnableLog && that._isEnableLog === undefined)) {
                    console[k](groupname, ...generateArguments(arguments, that._isSaveStack));
                }
            };
        });

        fn.toggleLog = function (isEnable) {
            that._isEnableLog = !!isEnable;
        };
        fn.toggleStack = function (isEnable) {
            that._isSaveStack = !!isEnable;
        };

        return fn;
    } else {
        return new Factory(groupname);
    }
};


Factory.toggleLog = function (isEnable) {
    isEnableLog = !!isEnable;
};
Factory.toggleStack = function (isEnable) {
    isSaveStack = !!isEnable;
};


module.exports = Factory;
