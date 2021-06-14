//this method is to locate the errors in each person's value
//i'll use it for counting number of found errors
export const Validate = (key, value, errors) => {
  if (key === "identity" || key === "age") {
    const validateValue = /\d+/;
    //check if the value doesnt  contain only digits
    if (!validateValue.test(value)) errors.push(value);
  }

  if (key === "firstname" || key === "surname") {
    if (value === "" || value === null || value === undefined)
      errors.push(value);
  }

  if (key === "sex") {
    const validateValue = /M|F/;
    //check if the value doesnt  contain only 'M' or 'F'
    if (!validateValue.test(value)) errors.push(value);
  }

  if (key === "mobile") {
    const validateValue = /\d{10}/;
    //check if the value doesnt  contain only 'M' or 'F'
    if (!validateValue.test(value)) errors.push(value);
  }

  if (key === "active") {
    const validateValue = /TRUE|FALSE/;
    //check if the value doesnt  contain only 'TRUE' or 'FALSE'
    if (!validateValue.test(value)) errors.push(value);
  }

  return errors;
};

const validateID = (key, value, people, setError) => {
  //check if the value doesn't  contain only digits
  const validateValue = /\d+/;
  if (!validateValue.test(value)) {
    setError({
      target: key,
      message: `${key} should be a number!`,
    });
    return true;
  }

  //check if the value already exist
  const exists = people.find((person) => person.identity === value);
  if (exists) {
    setError({
      target: key,
      message: `${key} already exist!`,
    });
    return true;
  }

  return false;
};

const validateName = (key, value, setError) => {
  //checking if the value is empty
  if (value === null || value === undefined) {
    setError({
      target: key,
      message: `${key} should be at least 2 characters long!`,
    });
    return true;
  }

  //checking the length of characters...
  if (value.length > 30 || value.length < 2) {
    setError({
      target: key,
      message: `${key} should be at least 2 and less than 30 characters long!`,
    });
    return true;
  }

  return false;
};

const validateSex = (key, value, setError) => {
  const validateValue = /M|F/;
  //check if the value doesnt  contain only 'M' or 'F'
  if (!validateValue.test(value)) {
    setError({
      target: key,
      message: `${key} value should be 'M' or 'F'!`,
    });
    return true;
  }

  return false;
};

const validateMobile = (key, value, setError) => {
  const validateValue = /\d{10}/;
  //check if the value doesnt  contain ten digits'
  if (!validateValue.test(value)) {
    setError({
      target: key,
      message: `${key} number should have 10 digits only!`,
    });
    return true;
  }

  return false;
};

const validateActive = (key, value, setError) => {
  const validateValue = /TRUE|FALSE/;
  //check if the value doesnt  contain ten digits'
  if (!validateValue.test(value)) {
    setError({
      target: key,
      message: `${key} should be only 'TRUE' or 'FALSE'!`,
    });
    return true;
  }

  return false;
};

//will be used for validating user input values
export const ErrorFound = (key, value, people, setError) => {
  if (key === "identity") return validateID(key, value, people, setError);

  if (key === "firstname" || key === "surname")
    return validateName(key, value, setError);

  if (key === "sex") return validateSex(key, value, setError);

  if (key === "mobile") return validateMobile(key, value, setError);

  if (key === "active") return validateActive(key, value, setError);
};