"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _typeof, _createClass, ProxyFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("ProxyFactory", ProxyFactory = function () {
        function ProxyFactory() {
          _classCallCheck(this, ProxyFactory);
        }

        _createClass(ProxyFactory, null, [{
          key: "create",
          value: function create(objeto, props, acao) {
            return new Proxy(objeto, {
              get: function get(target, prop, receiver) {

                //nesse pronto, ele está intrceptando a função
                //verificando se é uma function e se faz parte da lista a ser interceptada
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                  //aqui ele entra e substitui a função interceptada por essa
                  //OBS: não pode ser uma Arrow function, pois a mesma tem o contexto léxico
                  return function () {
                    //substituindo no proxy....
                    console.log("interceptando " + prop);
                    Reflect.apply(target[prop], target, arguments);
                    // nesse Reflect, ele pega a propriedade
                    return acao(target);
                  };
                }

                return Reflect.get(target, prop, receiver);
              },

              set: function set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                  target[prop] = value;
                  acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
              }
            });
          }
        }, {
          key: "_ehFuncao",
          value: function _ehFuncao(func) {
            return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
          }
        }]);

        return ProxyFactory;
      }());

      _export("ProxyFactory", ProxyFactory);
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map