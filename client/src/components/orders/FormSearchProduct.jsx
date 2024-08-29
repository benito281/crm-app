import React from 'react'

function FormSearchProduct({searchProduct, readDataSearch}) {
  return (
    <form onSubmit={searchProduct}>
        <legend>Busca un Producto y agrega una cantidad</legend>

        <div className="campo">
          <label>Productos:</label>
          <input type="text" placeholder="Nombre Productos" 
            name="products" 
            onChange={readDataSearch}/>
        </div>

        <input type="submit" 
        value="Buscar producto" 
        className="btn btn-azul btn-block"/>
    </form>
  )
}

export default FormSearchProduct