class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');


    this._listaNegociacoes = new Bind(
                             new ListaNegociacoes(),
                             new NegociacoesView($('#negociacoesView')),
                             'adiciona', 'esvazia');

    this._mensagem = new Bind(
                     new Mensagem(), //noca Mensagem
                     new MensagemView($('#mensagemView')), //nova instância de mensagemView
                     'texto'); //parâmetros

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

  importaNegociacoes(){

    let service = new NegociacaoService();
    service.obterNegociacoesDaSemana((erro, negociacoes) => {
      if(erro){
        this._mensagem.texto = erro;
        return;
      }
      negociacoes.forEach((negociacao) => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = 'Negociações importadas com sucesso';

      });
    });

  }

  _limpaFormulario(){
  this._inputData.value = '';
  this._inputValor.value = 0.0;
  this._inputQuantidade.value = 1;

  this._inputData.focus();

  }





}
