import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {Negociacao} from '../models/Negociacao';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';


export class NegociacaoController {
  constructor(){
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');


    this._listaNegociacoes = new Bind(
                             new ListaNegociacoes(),
                             new NegociacoesView($('#negociacoesView')),
                             'adiciona', '_esvazia');

    this._mensagem = new Bind(
                     new Mensagem(), //noca Mensagem
                     new MensagemView($('#mensagemView')), //nova instância de mensagemView
                     'texto'); //parâmetros

                     this._ordemAtual = '';

                     this._service = new NegociacaoService();

                     this._init();

     }

   _init() {

       this._service
           .lista()
           .then(negociacoes =>
               negociacoes.forEach(negociacao =>
                   this._listaNegociacoes.adiciona(negociacao)))
           .catch(erro => this._mensagem.texto = erro);

      setInterval(() => {
          this.importaNegociacoes();
      }, 13000);

     }

  _criaNegociacao(){
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  apaga() {

      this._service
          .apaga()
          .then(mensagem => {
              this._listaNegociacoes._esvazia();
              this._mensagem.texto = mensagem;
          })
          .catch(erro => this._mensagem.texto = erro);
  }

  adiciona(event) {

      event.preventDefault();

      let negociacao = this._criaNegociacao();

      this._service
          .cadastra(negociacao)
          .then(mensagem => {
              this._listaNegociacoes.adiciona(negociacao);
              this._mensagem.texto = mensagem;
              this._limpaFormulario();
          })
          .catch(erro => this._mensagem.texto = erro);
  }

  importaNegociacoes() {

      this._service
          .importa(this._listaNegociacoes.negociacoes)
          .then(negociacoes => negociacoes.forEach(negociacao => {
              this._listaNegociacoes.adiciona(negociacao);
              this._mensagem.texto = 'Negociações do período importadas'
          }))
          .catch(erro => this._mensagem.texto = erro);
  }



  _limpaFormulario(){
  this._inputData.value = '';
  this._inputValor.value = 0.0;
  this._inputQuantidade.value = 1;

  this._inputData.focus();

  }

  ordena(coluna) {

      if(this._ordemAtual == coluna) {
          this._listaNegociacoes.inverteOrdem();
      } else {
          this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);
      }
      this._ordemAtual = coluna;
  }



}
