export const validateCustomer = (customerData) => {
  const errors = [];

  // Validar nameCustomer
  if (!customerData.nameCustomer || customerData.nameCustomer.trim() === "") {
    errors.push({ message: 'El nombre del cliente es requerido' });
  }

  // Validar lastnameCustomer
  if (!customerData.lastnameCustomer || customerData.lastnameCustomer.trim() === "") {
    errors.push({ message: 'El apellido del cliente es requerido' });
  }

  // Validar company
  if (!customerData.company || customerData.company.trim() === "") {
    errors.push({ message: 'El nombre de la empresa es requerido' });
  }

  // Validar email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!customerData.email || !emailPattern.test(customerData.email)) {
    errors.push({ message: 'El email debe ser uno válido' });
  }

  // Validar phone
  const phonePattern = /^[0-9]/;
  if (!customerData.phone || !phonePattern.test(customerData.phone)) {
    errors.push({ message: 'El teléfono debe tener exactamente 8 dígitos y es requerido' });
  }

  if (errors.length > 0) {
    return { statusCode: 400, errors };
  }

  return { statusCode: 200 }; // OK si la validación es exitosa
};

export default validateCustomer;


/* const validateCustomer = (customerData) => {
  const errors = [];
  // Validar nameCustomer
  if (!customerData.nameCustomer || customerData.nameCustomer === "") {
    errors.push({ message: 'El nombre del cliente es requerido'});
  }
  // Validar lastnameCustomer
  if (!customerData.lastnameCustomer || customerData.lastnameCustomer === "") {
    errors.push({ message: 'El apellido del cliente es requerido'});
  }
  // Validar company
  if (!customerData.company || customerData.company === "") {
    errors.push({ message: 'El nombre de la empresa es requerido'});
  }
  // Validar email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!customerData.email || !emailPattern.test(customerData.email)) {
    errors.push({ message: 'El email debe ser uno válido' });
  }

  // Validar phone
  const phonePattern = /^[0-9]{8}$/;
  if (!customerData.phone || !phonePattern.test(customerData.phone)) {
    errors.push({ message: 'El teléfono debe tener exactamente 8 dígitos y es requerido'});
  }

  if (errors.length > 0) {
    return { statusCode: 400, errors };
  }

  return { statusCode: 200 }; // OK si la validación es exitosa
};

export default validateCustomer;
 */