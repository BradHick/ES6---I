class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');


    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._listaNegociacoes = new Bind(
                             new ListaNegociacoes(),
                             this._negociacoesView,
                             'adiciona', 'esvazia');


    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagem = new Bind(
                     new Mensagem(),
                     this._mensagemView,
                     'texto');

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
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    //adicionar a negociação em uma lista

    this._mensagem.texto = "Negociação adicionada com sucesso!";
    console.log(this._listaNegociacoes.negociacoes);
    this._limpaFormulario();
  }

  _limpaFormulario(){
  this._inputData.value = '';
  this._inputValor.value = 0.0;
  this._inputQuantidade.value = 1;

  this._inputData.focus();

  }





}
