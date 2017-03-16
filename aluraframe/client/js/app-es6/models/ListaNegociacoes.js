export class ListaNegociacoes {
  constructor() {

    this._negociacoes = [];
  }

  adiciona(negociacao){
    this._negociacoes.push(negociacao);
  }

  get negociacoes(){
    return [].concat(this._negociacoes); //forma de blindar a lista pra não poderem mecher sem ser pelo método

  }

  _esvazia(){
    this._negociacoes = [];
  }



}
