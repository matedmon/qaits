import { ArrowDropDown } from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PersonContext from "../context/PersonContext";
import styles from "../styles/EditPerson.module.css";
import { ErrorFound } from "../utils/ValidateData";

const Messages = ({ error, success, keyValue }) => {
  return (
    <>
      {error.target === keyValue ? (
        <p className={styles.errorMessage}>{error.message}</p>
      ) : null}

      {success.target === keyValue ? (
        <p className={styles.successMessage}>{success.message}</p>
      ) : null}
    </>
  );
};

const ActionButtons = (props) => {
  const { edit, error, success, keyValue, saveData, enableEdit } = props;

  return (
    <>
      {edit === keyValue ? (
        <>
          {error.target === edit || success.target === edit ? (
            <Messages error={error} success={success} keyValue={edit} />
          ) : (
            <p className={styles.saveBtn} onClick={() => saveData(edit)}>
              Save
            </p>
          )}
        </>
      ) : (
        <p className={styles.editBtn} onClick={() => enableEdit(keyValue)}>
          Edit
        </p>
      )}
    </>
  );
};

const EditPerson = () => {
  const { people, setPeople, setExtraInfo } = useContext(PersonContext);
  const location = useLocation();
  const [person, setPerson] = useState(location.state.person);
  const [edit, setEdit] = useState(null);
  const [textInput, setTextInput] = useState(null);
  const [select, setSelect] = useState(null); //will be used to select active and sex values

  const [numErrors, setNumErrors] = useState(
    location.state.person.errors.length
  );
  const [error, setError] = useState({
    target: null,
    message: null,
  });

  const [success, setSuccess] = useState({
    target: null,
    message: null,
  });

  const routeHistory = useHistory();
  const activeRef = useRef();
  const sexRef = useRef();

  //================== handle actions ================================
  const enableEdit = (key) => {
    //enable input
    setEdit(key);

    //display not the error and success message
    setError({
      target: null,
      message: null,
    });

    setSuccess({
      target: null,
      message: null,
    });
    setSelect(null);
  };

  const saveData = (key) => {
    //=================== error handling =========================
    //we don't update the person if the input is empty
    const isEmpty = /\s+/;
    if (isEmpty.test(textInput) || textInput === null) {
      //remove the inputted value
      setTextInput(null);
      return;
    }

    //making sure the value that already exist doesn't get updated
    if (person[key.toLowerCase()] === textInput) {
      //remove the inputted value
      setTextInput(null);
      return;
    }

    //if there's an error, do not update the person's details
    const found = ErrorFound(key, textInput, people, setError);
    if (found) {
      //remove the inputted value
      setTextInput(null);
      return;
    }

    //================= update person's details ===================
    setPerson((prev) => {
      return {
        ...prev,
        [key.toLowerCase()]: textInput,
      };
    });

    //display not the edit button and the error message
    setError({
      target: null,
      message: null,
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

    //updating error array of the current person
    const index = person.errors.findIndex((p) => p.key === key.toLowerCase());
    if (index !== -1) {
      //if the error key is available, remove it from the error array
      //NB: person.errors() contains all the errors found on this person's details
      //so now that the error is resolved, there's no need to mark this value as error.

      setPerson((prev) => {
        return {
          ...prev,
          errors: prev.errors.splice(index, 1),
        };
      });
    }
  };

  const updatePeople = () => {
    //update total errors
    setExtraInfo((prev) => {
      return {
        ...prev,
        totalErrors: prev.totalErrors - numErrors,
      };
    });

    //update the people array
    const index = people.findIndex((p) => p.identity === person.identity);
    if (index > -1) {
      setPeople((prev) => {
        prev[index] = person;
        return prev;
      });
    }

    setNumErrors(0);

    //go back to homepage
    routeHistory.goBack();
  };

  const handleInput = (e) => {
    e.preventDefault();
    //remove error message when typing
    if (error.target) {
      setError({
        target: null,
        message: null,
      });
    }
    setTextInput(e.target.value);
  };

  const handleSelect = (value) => {
    setTextInput(value);
    setSelect(value);

    //hide dropdown after selection
    activeRef.current.style.pointerEvents = "none";
    sexRef.current.style.pointerEvents = "none";
  };

  const doneBtnStyle = {
    backgroundColor: person.errors.length === 0 ? "#0073cf" : "white",
    color: person.errors.length === 0 ? "white" : "#646c7f",
    pointerEvents: person.errors.length === 0 ? "visible" : "none",
    border: person.errors.length === 0 ? "none" : "solid 1px #ccc",
  };

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Edit Person's details</h1>
        </header>

        <section className={styles.form}>
          {/*============= identity =======================*/}
          <div className={styles.formDetail}>
            <label htmlFor="id">Identity:</label>
            <br />
            <input
              type="number"
              id="id"
              min={0}
              maxLength={1}
              required
              defaultValue={person.identity}
              disabled={edit === "Identity" ? false : true}
              onChange={handleInput}
            />
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Identity"
            />
            <br />
          </div>

          {/*============= first name =================*/}
          <div className={styles.formDetail}>
            <label htmlFor="name">First Name:</label>
            <br />
            <input
              type="text"
              id="name"
              minLength={2}
              maxLength={30}
              defaultValue={person.firstname}
              disabled={edit === "Firstname" ? false : true}
              onChange={handleInput}
            />
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Firstname"
            />
            <br />
          </div>

          {/*============= surname ====================*/}
          <div className={styles.formDetail}>
            <label htmlFor="surname">Surname:</label>
            <br />
            <input
              type="text"
              id="surname"
              minLength={2}
              maxLength={30}
              defaultValue={person.surname}
              disabled={edit === "Surname" ? false : true}
              onChange={handleInput}
            />
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Surname"
            />
            <br />
          </div>

          {/* ============ age ======================*/}
          <div className={styles.formDetail}>
            <label htmlFor="age">Age:</label>
            <br />
            <input
              type="number"
              id="age"
              minLength={1}
              maxLength={3}
              size={3}
              max={300}
              min={1}
              defaultValue={person.age}
              disabled={edit === "Age" ? false : true}
              onChange={handleInput}
            />
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Age"
            />
            <br />
          </div>

          {/* ============ mobile ==================== */}
          <div className={styles.formDetail}>
            <label htmlFor="mobile">Mobile:</label>
            <br />
            <input
              type="tel"
              id="mobile"
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              defaultValue={person.mobile}
              disabled={edit === "Mobile" ? false : true}
              onChange={handleInput}
            />
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Mobile"
            />
            <br />
          </div>

          {/* ============ sex ===================== */}
          <div className={styles.formDetail}>
            <label htmlFor="sex">Sex:</label>
            <br />
            <div
              name="sex"
              id="sex"
              style={{
                pointerEvents: edit === "Sex" ? "visible" : "none",
              }}
              className={styles.dropdownWrapper}
              ref={sexRef}
            >
              <div className={styles.dropdownItem}>
                <p>{select && edit === "Sex" ? select : person.sex}</p>
                <ArrowDropDown fontSize="small" />
              </div>
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSelect("M")}
                >
                  <p>M</p>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSelect("F")}
                >
                  <p>F</p>
                </div>
              </div>
            </div>
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Sex"
            />
          </div>

          {/* ============ active ===================== */}
          <div className={styles.formDetail}>
            <label htmlFor="active">Active:</label>
            <br />
            <div
              name="active"
              id="active"
              style={{
                pointerEvents: edit === "Active" ? "visible" : "none",
              }}
              className={styles.dropdownWrapper}
              ref={activeRef}
            >
              <div className={styles.dropdownItem}>
                <p>{select && edit === "Active" ? select : person.active}</p>
                <ArrowDropDown fontSize="small" />
              </div>
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSelect("TRUE")}
                >
                  <p>TRUE</p>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => handleSelect("FALSE")}
                >
                  <p>FALSE</p>
                </div>
              </div>
            </div>
            <ActionButtons
              success={success}
              error={error}
              enableEdit={enableEdit}
              edit={edit}
              saveData={saveData}
              keyValue="Active"
            />
          </div>

          {/* ============ button ====================== */}
          <div>
            <div
              style={doneBtnStyle}
              className={styles.submitBtn}
              onClick={() => updatePeople()}
            >
              <p>DONE</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditPerson;
