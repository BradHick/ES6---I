class Bind {
  constructor(model, view, ...props) {

    let proxy = ProxyFactory.create(model,
                                    props,
                                    (model) =>{
                                                view._update(model);
                                              }
                                            );
    view._update(model);
    return proxy;

  }
}
