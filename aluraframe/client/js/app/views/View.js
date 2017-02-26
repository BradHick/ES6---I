class View {
  constructor(elemento) {
      this._elemento = elemento;
  }


  _template(){
    throw new Error("O método template deve ser implementado.");
  }

  _update(model){
    this._elemento.innerHTML = this._template(model);
  }
}
