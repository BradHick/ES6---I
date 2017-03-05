class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
  return new Promise((resolve, reject) =>{
          this._http.get('negociacoes/semana')
          .then((negociacoes) =>
              resolve(negociacoes.map((objeto) => {
                //aqui ele varre cada elemento do array e transforma numa negociação
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          })))
          .catch((erro) => {
            console.log(erro);
            reject('Não foi possivel importar as negociações da semana');
          });
  });


}
  obterNegociacoesDaSemanaAnterior() {
  return new Promise((resolve, reject) =>{
          this._http.get('negociacoes/anterior')
          .then((negociacoes) =>
              resolve(negociacoes.map((objeto) => {
                //aqui ele varre cada elemento do array e transforma numa negociação
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          })))
          .catch((erro) => {
            console.log(erro);
            reject('Não foi possivel importar as negociações da semana anterior');
          });
  });


}

  obterNegociacoesDaSemanaRetrasada() {
  return new Promise((resolve, reject) =>{
          this._http.get('negociacoes/retrasada')
          .then((negociacoes) =>
              resolve(negociacoes.map((objeto) => {
                //aqui ele varre cada elemento do array e transforma numa negociação
                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
          })))
          .catch((erro) => {
            console.log(erro);
            reject('Não foi possivel importar as negociações da semana retrasada');
          });
  });


}





  }
