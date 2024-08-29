import Swal from "sweetalert2";

//Muestra una alerta personalizada
const showAlert = (title, description, icon) => {
    Swal.fire({
      title: title,
      text: description,
      icon: icon,
    });
  };

  export default showAlert;