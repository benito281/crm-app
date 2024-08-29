import Products from "../models/Products.js";
import { ExpressFileuploadValidator } from "express-fileupload-validator";
import { fileURLToPath } from "url";
import path from "path";
import shortid from "shortid";
import fs from "fs";

// Validaciones de archivos permitidos
const expressFileuploadValidator = new ExpressFileuploadValidator({
  allowedExtensions: ["jpg", "png", "gif"],
  allowedMimetypes: ["image/jpg", "image/jpeg", "image/png", "image/gif"],
  maxSize: "20MB",
},{
  minCount: 'Too few files, minimum {0} are expected but {1} are given',
  maxCount: 'Too many files, maximum {0} are allowed but {1} are given',
  minSize: 'Minimum expected size for file {0} is {1} but {2} detected',
  maxSize: 'Maximum allowed size for file {0} is {1} but {2} detected',
  allowedExtensions: 'File {0} has an incorrect extension of {1}, allowed extensions are: {2}',
  disallowedExtensions: 'File {0} has an incorrect extension of {1}, disallowed extensions are: {2}',
  allowedMimetypes: 'File {0} has an incorrect mimetype of {1}, allowed mimetypes are: {2}',
  disallowedMimetypes: 'File {0} has an incorrect mimetype of {1}, disallowed mimetypes are: {2}',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const validateAndSave = async (image) => {
    //Validar imagen
    await expressFileuploadValidator.validate(image)
    // Generar un nombre de archivo único con la extensión correcta
    const fileExtension = path.extname(image.name);
    const uniqueFilename = `${shortid.generate()}${fileExtension}`;
    const uploadPath = path.join(__dirname, "../uploads", uniqueFilename);

    // Mover el archivo al directorio de destino
    await image.mv(uploadPath);
    return uniqueFilename;
  
};

const deleteOldImage = async (imagePath) => {
  if (imagePath) {
    const oldImagePath = path.join(__dirname, "../uploads", path.basename(imagePath));
    fs.unlink(oldImagePath, (err) => {
      if (err) console.error(err);
    });
  }
};
// Agrega un producto
export const addProduct = async (req, res) => {
  const { nameProduct, price } = req.body;
  const { image } = req.files;
  try {
    if (!req.files || !req.files.image) {
      return res.json({
        message: "Carge una imagen",
      });
    }

    const validate = await validateAndSave(image);

      // Guardar información del producto en la base de datos
      const newProduct = new Products({
        nameProduct: nameProduct,
        price: Number.parseFloat(price),
        image: validate, // Guardar solo el nombre del archivo
      });

      const savedProduct = await newProduct.save();

      return res.json({
        message: "Producto agregado correctamente",
      });
    
  } catch (error) {
    return res.status(400).json({
      message: "Error al cargar el producto",
      error: error.message,
    });
  }
};

//Muestra todos los productos
export const showProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    return res.json(
      products
    );
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//Muestra un solo producto
export const showProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.json({
        message: "El producto no fue encontrado",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

//Actualiza producto
export const updateProduct = async (req, res) => {
  const { nameProduct, price } = req.body;
  const { id } = req.params;
  const newPrice = Number.parseFloat(price);
  let product = { nameProduct, price: newPrice };

  try {
    const productFound = await Products.findById(id);
    if (!productFound) {
      return res.status(404).json({ message: "El producto no fue encontrado" });
    }

    if (req.files && req.files.image) {
      const { image } = req.files;
      const validate = await validateAndSave(image);
      product.image = validate;
      await deleteOldImage(productFound.image);
    } else {
      product.image = productFound.image;
    }

    const productUpdate = await Products.findByIdAndUpdate(id, product, { new: true });

    if (!productUpdate) {
      return res.status(500).json({ message: "Error al actualizar el producto" });
    }

    return res.json({
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({
      message: error.message,
    });
  }
};


//Eliminar producto
export const deleteProduct = async (req, res) => {
  const {id} = req.params;
  try {
    const productFound = await Products.findById(id);
    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    await deleteOldImage(productFound.image);

    const product = await Products.findByIdAndDelete(id);
    if(!product) return res.json({message : "El producto no existe"});
    return res.json({
      message : "Producto eliminado"
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const searchProduct = async (req, res) => {
  const { query } = req.params;
  try {
   const search = await Products.find({nameProduct : new RegExp(query, 'i')});
   if (search) {
    return res.status(200).json(search);
   }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message : 'Error en la busqueda'
    });
  }
}