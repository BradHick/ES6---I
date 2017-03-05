class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    let self = this;
    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
      get: function(target, prop, receiver) {

        //nesse pronto, ele está intrceptando a função
        //verificando se é uma function e se faz parte da lista a ser interceptada
        if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

          //aqui ele entra e substitui a função interceptada por essa
          //OBS: não pode ser uma Arrow function, pois a mesma tem o contexto léxico
          return function(){ //substituindo no proxy....
            console.log(`interceptando ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            // nesse Reflect, ele pega a propriedade
            self._negociacoesView._update(target);
          }
        }

        return Reflect.get(target, prop, receiver);
      }
    });




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
