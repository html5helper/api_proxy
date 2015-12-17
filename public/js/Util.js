//Object Clone
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
		var len = obj.length;
        for (var i = 0;i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

//EventDispatcher
var EventDispatcher = {
	addEventListener: function(eventName, listener, priority){
		var listeners = this.getEventListeners(eventName);
		if (listeners.indexOf(listener) < 0) {
			listener._event_priority = priority||0;
			listeners.push(listener);
		}
		return this;
	},
	
	onEventOnce: function(name, handler){
		var caller = function(event){
			handler.call(null, event);
			this.removeEventListener(name, caller);
		}.bind(this);
		return this.addEventListener(name, caller);
	},

	removeEventListener: function(eventName, listener){
		if(arguments.length==0){
			this.removeAllEventListeners();
			return this;
		}
		var listeners = this.getEventListeners(eventName);
		if(listener){
			var i = listeners.indexOf(listener);
			if(i>=0) listeners.splice(i, 1);
		}
		else{
			listeners.clear();
		}
		return this;
	},
	
	removeAllEventListeners: function(){
		this._listenerMap = {};
		return this;
	},
	
	dispatchEvent: function(event){
		if (event instanceof String) event = {name: event};
		event.target = this;
		event.stop = function(){
			event._stop = true;
		};
		var listeners = this.getEventListeners(event.name);
		listeners = listeners.concat(this.getEventListeners('*'));
		listeners = listeners.sort(function(left, right) {
			var a = left._event_priority, b = right._event_priority;
			return a < b ? -1 : a > b ? 1 : 0;
		});
		for(var i=0; i<listeners.length; i++){
			listeners[i].call(null, event);
			if(event._stop) break;
		}
		return this;
	},
	
	getEventListeners: function(eventName){
		if(!this._listenerMap){
			this._listenerMap = {};
		}
		var listeners = this._listenerMap[eventName];
		if(!listeners){
			listeners = [];
			this._listenerMap[eventName] = listeners;
		}
		return listeners;
	}
};

var Class = (function () {
	function updateObj(array, args) {
		var arrayLength = array.length,
		length = args.length;
		while (length--)
			array[arrayLength + length] = args[length];
		return array;
	}
	function wrapFun(fun, wrapper) {
		var __method = fun;
		return function () {
			var a = updateObj([__method.bind(this)], arguments);
			return wrapper.apply(this, a);
		}
	}
	function argumentNames(fun) {
		var names = fun.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
			.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
			.replace(/\s+/g, '').split(',');
		return names.length == 1 && !names[0] ? [] : names;
	}
	function extend(destination, source) {
		for (var property in source)
			destination[property] = source[property];
		return destination;
	}
	function _toArray(iterable) {
		if (!iterable)
			return [];
		var length = iterable.length || 0,
		results = new Array(length);
		while (length--)
			results[length] = iterable[length];
		return results;
	}
	var IS_DONTENUM_BUGGY = (function () {
		for (var p in {
			toString : 1
		}) {
			if (p === 'toString')
				return false;
		}
		return true;
	})();

	function subclass() {};
	function create() {
		var parent = null,
		properties = _toArray(arguments);
		//if (Object.isFunction(properties[0]))
		if (properties[0]instanceof Function)
			parent = properties.shift();

		function klass() {
			this.initialize.apply(this, arguments);
		}

		extend(klass, Class.Methods);
		klass.superclass = parent;
		klass.subclasses = [];

		if (parent) {
			subclass.prototype = parent.prototype;
			klass.prototype = new subclass;
			parent.subclasses.push(klass);
		}

		for (var i = 0, length = properties.length; i < length; i++)
			klass.addMethods(properties[i]);

		if (!klass.prototype.initialize)
			klass.prototype.initialize = function () {};

		klass.prototype.constructor = klass;
		return klass;
	}

	function addMethods(source) {
		var ancestor = this.superclass && this.superclass.prototype,
		properties = Object.keys(source);

		if (IS_DONTENUM_BUGGY) {
			if (source.toString != Object.prototype.toString)
				properties.push("toString");
			if (source.valueOf != Object.prototype.valueOf)
				properties.push("valueOf");
		}

		for (var i = 0, length = properties.length; i < length; i++) {
			var property = properties[i],
			value = source[property];
			if (ancestor && value instanceof Function &&
				argumentNames(value)[0] == "$super") {
				var method = value;
				value = wrapFun((function (m) {
							return function () {
								return ancestor[m].apply(this, arguments);
							};
						})(property), method);

				value.valueOf = (function (method) {
					return function () {
						return method.valueOf.call(method);
					};
				})(method);

				value.toString = (function (method) {
					return function () {
						return method.toString.call(method);
					};
				})(method);
			}
			this.prototype[property] = value;
		}

		return this;
	}

	return {
		create : create,
		Methods : {
			addMethods : addMethods
		}
	};
})();
