import axios from "axios";

const handleError = (key, error, setError) => {
  console.log(error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    setError({
      message: error.response.data,
      target: key,
    });
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    setError({
      message: error.request.data,
      target: key,
    });
  } else {
    setError({
      message: "Unknown error occured!",
      target: key,
    });
  }
};

//edit data and save to database
export const editPerson = (
  id,
  key,
  value,
  setPeople,
  setPerson,
  setLoading,
  setSuccess,
  setTextInput,
  setEdit,
  setError
) => {
  setLoading(key); //show progressbar

  setError({
    message: null,
    target: null,
  });

  axios
    .patch(`http://localhost:5000/person/update/${id}`, {
      [key.toLowerCase()]: value,
    })
    .then(function (response) {
      setLoading(null);

      //update person details
      setPerson(response.data);

      //update people array
      setPeople((prev) => {
        const index = prev.findIndex((person) => person._id === id);
        prev[index] = response.data;
        return prev;
      });

      //show success message
      setSuccess({
        target: key,
        message: `${key} updated successfully!`,
      });

      //hide the success message after 1.5 sec
      setTimeout(() => {
        setSuccess({
          target: null,
          message: null,
        });

        //show edit button
        setEdit(null);
      }, 1500);

      //remove the inputted value
      setTextInput(null);
    })
    .catch(function (error) {
      setLoading(false);
      handleError(key, error, setError);
    });
};

export const addPeople = (key, people, setLoading, setError) => {
  setLoading(key); //show progressbar
  setError({
    message: null,
    target: null,
  });

  const form = new FormData();
  for (let i = 0; i < people.length; i++) {
    form.append("people", JSON.stringify(people[i]));
  }

  axios
    .post(`http://localhost:5000/person/addAll`, {
      people: JSON.stringify(people),
    })
    .then(function (response) {
      console.log(response.data);
      setLoading(null);
    })
    .catch(function (error) {
      setLoading(null);
      handleError(key, error, setError);
    });
};

export const getPeople = (key, setPeople, setLoading, setError) => {
  setLoading(key); //show progressbar

  setError({
    message: null,
    target: null,
  });

  axios
    .get(`http://localhost:5000/person/getAll`)
    .then(function (response) {
      setLoading(null);

      //update people array
      setPeople(response.data);
    })
    .catch(function (error) {
      setLoading(null);
      handleError(key, error, setError);
    });
};
