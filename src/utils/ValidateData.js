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
  if (exists > -1) {
    setError({
      target: key,
      message: `${key} already exist!`,
    });
    return true;
  }

  if (value < 0) {
    setError({
      target: key,
      message: `${key} should be greater than 0!`,
    });
    return true;
  }

  return false;
};

const validateAge = (key, value, setError) => {
  //check if the value doesn't  contain only digits
  const validateValue = /\d+/;
  if (!validateValue.test(value)) {
    setError({
      target: key,
      message: `${key} should be a number!`,
    });
    return true;
  }

  if (value <= 0 || value > 300) {
    setError({
      target: key,
      message: `${key} should be greater than 0 and less than 300!`,
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
      message: `${key} should be at least 2 and less than 31 characters long!`,
    });
    return true;
  }

  return false;
};

const validateSex = (key, value, setError) => {
  const validateValue = /M|F/i;
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

  //mobile number should start with 0;
  if (value.charAt(0) !== "0") {
    setError({
      target: key,
      message: `${key} number should start with '0'!`,
    });
    return true;
  }

  return false;
};

const validateActive = (key, value, setError) => {
  const validateValue = /TRUE|FALSE/i;
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
  if (key === "Identity") return validateID(key, value, people, setError);

  if (key === "Firstname" || key === "Surname")
    return validateName(key, value, setError);

  if (key === "Sex") return validateSex(key, value, setError);

  if (key === "Mobile") return validateMobile(key, value, setError);

  if (key === "Active") return validateActive(key, value, setError);

  if (key === "Age") return validateAge(key, value, setError);
};

//this method is to locate the errors in each person's value
//i'll use it for counting number of found errors
export const Validate = (key, value, people, errors) => {
  if (key === "identity") {
    const validateValue = /\d+/;
    //check if the value doesnt  contain only digits
    if (!validateValue.test(value)) errors.push({ key, value });

    //check if the value already exist
    const exists = people.find((person) => person.identity === value);
    if (validateValue && exists > -1) errors.push({ key, value });
  }

  if (key === "age") {
    const validateValue = /\d+/;
    //check if the value doesnt  contain only digits
    if (!validateValue.test(value)) errors.push({ key, value });
  }

  if (key === "firstname" || key === "surname") {
    if (value === "" || value === null || value === undefined)
      errors.push({ key, value });
  }

  if (key === "sex") {
    const validateValue = /M|F/i;
    //check if the value doesnt  contain only 'M' or 'F'
    if (!validateValue.test(value)) errors.push({ key, value });
  }

  if (key === "mobile") {
    const validateValue = /\d{10}/;
    //check if the value doesnt  contain only 'M' or 'F'
    if (!validateValue.test(value)) errors.push({ key, value });
  }

  if (key === "active") {
    const validateValue = /TRUE|FALSE/i;
    //check if the value doesnt  contain only 'TRUE' or 'FALSE'
    if (!validateValue.test(value)) errors.push({ key, value });
  }
};
