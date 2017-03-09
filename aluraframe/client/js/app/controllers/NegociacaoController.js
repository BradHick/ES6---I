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

    ConnectionFactory
        .getConnection()
        .then(connection => {

          let negociacao = this._criaNegociacao();
          new NegociacaoDao(connection)
              .adiciona(negociacao)
              .then((value) => {
                  this._listaNegociacoes.adiciona(negociacao);
                  this._mensagem.texto = "Negociação adicionada com sucesso!";
                  console.log(this._listaNegociacoes.negociacoes);
                  this._limpaFormulario();
              });

        }).catch((erro) => {
          this._mensagem.texto = erro;
        });



 
  }

  importaNegociacoes(){

    let service = new NegociacaoService();

    Promise.all([service.obterNegociacoesDaSemana(),
                 service.obterNegociacoesDaSemanaAnterior(),
                 service.obterNegociacoesDaSemanaRetrasada()]
    ).then((negociacoes) => {
        negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
        .forEach((negociacao) => {this._listaNegociacoes.adiciona(negociacao);});
        this._mensagem.texto = 'Negociações importadas com sucesso.'
    }).catch((erro) => {this._mensagem.texto = erro});

  }

  _limpaFormulario(){
  this._inputData.value = '';
  this._inputValor.value = 0.0;
  this._inputQuantidade.value = 1;

  this._inputData.focus();

  }





}
