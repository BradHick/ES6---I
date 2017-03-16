export class ProxyFactory {
  constructor() {

  }

  static create(objeto, props, acao){
    return new Proxy(objeto, {
      get: function(target, prop, receiver) {

        //nesse pronto, ele está intrceptando a função
        //verificando se é uma function e se faz parte da lista a ser interceptada
        if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

          //aqui ele entra e substitui a função interceptada por essa
          //OBS: não pode ser uma Arrow function, pois a mesma tem o contexto léxico
          return function(){ //substituindo no proxy....
            console.log(`interceptando ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            // nesse Reflect, ele pega a propriedade
            return acao(target);
          }
        }

        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver){
        if(props.includes(prop)){
          target[prop] = value;
          acao(target);
        }
        return Reflect.set(target, prop, value, receiver);
      }


    });

  }

  static _ehFuncao(func){
    return typeof(func) == typeof(Function);
  }


}
