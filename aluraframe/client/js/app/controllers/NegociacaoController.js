class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView._update(this._listaNegociacoes);
  }

  _criaNegociacao(){
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView._update(this._listaNegociacoes);
    console.log(this._listaNegociacoes.negociacoes);
    this._limpaFormulario();

    //adicionar a negociação em uma lista
  }

  _limpaFormulario(){
  this._inputData.value = '';
  this._inputValor.value = 0.0;
  this._inputQuantidade.value = 1;

  this._inputData.focus();

  }



}
