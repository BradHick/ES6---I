class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes(model =>
      this._negociacoesView._update(model));

    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView._update(this._listaNegociacoes);
    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagemView._update(this._mensagem);
  }

  _criaNegociacao(){
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  apaga(){
    this._listaNegociacoes._esvazia();

    this._mensagem.texto = "Negociações excluidas com sucesso";
    this._mensagemView._update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());

    this._mensagem.texto = "Negociação adicionada com sucesso!";
    this._mensagemView._update(this._mensagem);
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
