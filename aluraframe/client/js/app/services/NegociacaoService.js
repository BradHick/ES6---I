class NegociacaoService {
  constructor() {

  }

  obterNegociacoesDaSemana(cb){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4){
              if(xhr.status == 200){
                //pega os valores que estão no servidor e converte pra JSON
                cb(null, JSON.parse(xhr.responseText)
                .map((objeto) => {
                  //aqui ele varre cada elemento do array e transforma numa negociação
                  return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                }));
              }else{
                console.log(xhr.responseText);
                cb('Não foi possícel obter as nogicações do servidor', null);

              }
          }
        };

        xhr.send();
  }
}
