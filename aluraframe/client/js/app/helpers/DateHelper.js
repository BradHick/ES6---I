class DateHelper {
  constructor() {

  }

  static dataParaTexto(data){

    return data.getDate()
    + '/' + (data.getMonth() + 1)
    + '/' + data.getFullYear();

  }

  static textoParaData(texto){
    return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
  }



}
