//this method is to locate the errors in each person's data
export const Validate = (label, data, errors) => {
  if (label === "identity" || label === "age") {
    const validateData = /\d+/;
    //check if the data doesnt  contain only digits
    if (!validateData.test(data)) errors.push(data);
  }

  if (label === "firstname" || label === "surname") {
    if (data === "" || data === null || data === undefined) errors.push(data);
  }

  if (label === "sex") {
    const validateData = /M|F/;
    //check if the data doesnt  contain only 'M' or 'F'
    if (!validateData.test(data)) errors.push(data);
  }

  if (label === "mobile") {
    const validateData = /\d{10}/;
    //check if the data doesnt  contain only 'M' or 'F'
    if (!validateData.test(data)) errors.push(data);
  }

  if (label === "active") {
    const validateData = /TRUE|FALSE/;
    //check if the data doesnt  contain only 'TRUE' or 'FALSE'
    if (!validateData.test(data)) errors.push(data);
  }

  return errors;
};
