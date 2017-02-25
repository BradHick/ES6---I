class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();

  }

  adiciona(event) {
    event.preventDefault();


    let negociacao = new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );

    this._listaNegociacoes.adiciona(negociacao);
    console.log(this._listaNegociacoes.negociacoes);
    this._limpaFormulario();

    //adicionar a negociação em uma lista
  }

  _limpaFormulario(){
  this._inputData.value = '';
  this._inputValor.value = 0.0;
  this._inputQuantidade.value = '';

  this._inputQuantidade.focus();

  }



}
