import React from "react";

function FormCantProduct({product, sumProduct, subtractProduct, index, deleteProductOrder}) {
  
  return (
    <li>
      <div className="texto-producto">
        <p className="nombre">{product.nameProduct}</p>
        <p className="precio">${product.price}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i className="fas fa-minus"
            onClick={() => subtractProduct(index)}></i>
          <p>{product.amount}</p>
          <i className="fas fa-plus" 
             onClick={() => sumProduct(index)}></i>
        </div>
        <button 
          type="button" 
          className="btn btn-rojo" 
          onClick={() => deleteProductOrder(product.product)}>
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}

export default FormCantProduct;
