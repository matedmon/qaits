import { ArrowDropDown } from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PersonContext from "../context/PersonContext";
import styles from "../styles/EditPerson.module.css";
import { ErrorFound } from "../utils/ValidateData";

const EditPerson = () => {
  const { people, setPeople } = useContext(PersonContext);
  const location = useLocation();
  const [person, setPerson] = useState(people[location.state.index]);
  const [edit, setEdit] = useState(null);
  const [textInput, setTextInput] = useState(null);
  const [select, setSelect] = useState(null); //will be used to select active and sex values
  const [error, setError] = useState({
    target: null,
    message: null,
  });
  const [success, setSuccess] = useState({
    target: null,
    message: null,
  });
  const routeHistory = useHistory();

  //================== handle actions ================================
  const EnableEdit = (key) => {
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

  const SaveData = (key) => {
    //save the updated value
    const found = ErrorFound(key, textInput, people, setError);
    if (found) {
      //if there's an error, do not update the person's details
      return;
    } else {
      setPerson((prev) => {
        return {
          ...prev,
          [key.toLowerCase()]: textInput,
        };
      });

      //display not the edit button and the error message
      setEdit(null);
      setError({
        target: null,
        message: null,
      });

      //show success message
      setSuccess({
        target: key,
        message: `${key} updated successfully!`,
      });

      //hide the success message after 3 seconds
      setTimeout(() => {
        setSuccess({
          target: null,
          message: null,
        });
      }, 3000);
    }
  };

  const UpdatePeople = () => {
    //update the people array
    setPeople((prev) => {
      prev[location.state.index] = person;
      return prev;
    });

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

  //================== component ======================================
  const Messages = ({ key }) => {
    return (
      <>
        {error.target === key ? (
          <p className={styles.errorMessage}>{error.message}</p>
        ) : null}

        {success.target === key ? (
          <p className={styles.successMessage}>{success.message}</p>
        ) : null}
      </>
    );
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
            <>
              {edit === "Identity" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={styles.editBtn}
                  onClick={() => EnableEdit("Identity")}
                >
                  Edit
                </p>
              )}
            </>
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
            <>
              {edit === "Firstname" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={styles.editBtn}
                  onClick={() => EnableEdit("Firstname")}
                >
                  Edit
                </p>
              )}
            </>
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
            <>
              {edit === "Surname" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={styles.editBtn}
                  onClick={() => EnableEdit("Surname")}
                >
                  Edit
                </p>
              )}
            </>

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
              max={300}
              defaultValue={person.age}
              disabled={edit === "Age" ? false : true}
              onChange={handleInput}
            />
            <>
              {edit === "Age" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p className={styles.editBtn} onClick={() => EnableEdit("Age")}>
                  Edit
                </p>
              )}
            </>

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
            <>
              {edit === "Mobile" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={styles.editBtn}
                  onClick={() => EnableEdit("Mobile")}
                >
                  Edit
                </p>
              )}
            </>

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
            >
              <div className={styles.dropdownItem}>
                <p>{select && edit === "Sex" ? select : person.sex}</p>
                <ArrowDropDown fontSize="small" />
              </div>
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setTextInput("M");
                    setSelect("M");
                  }}
                >
                  <p>M</p>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setTextInput("F");
                    setSelect("F");
                  }}
                >
                  <p>F</p>
                </div>
              </div>
            </div>
            <>
              {edit === "Sex" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p className={styles.editBtn} onClick={() => EnableEdit("Sex")}>
                  Edit
                </p>
              )}
            </>
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
            >
              <div className={styles.dropdownItem}>
                <p>{select && edit === "Active" ? select : person.active}</p>
                <ArrowDropDown fontSize="small" />
              </div>
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setTextInput("TRUE");
                    setSelect("TRUE");
                  }}
                >
                  <p>TRUE</p>
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setTextInput("FALSE");
                    setSelect("FALSE");
                  }}
                >
                  <p>FALSE</p>
                </div>
              </div>
            </div>
            <>
              {edit === "Active" ? (
                <>
                  {error.target === edit || success.target === edit ? (
                    <Messages key={edit} />
                  ) : (
                    <p
                      className={styles.saveBtn}
                      onClick={() => SaveData(edit)}
                    >
                      Save
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={styles.editBtn}
                  onClick={() => EnableEdit("Active")}
                >
                  Edit
                </p>
              )}
            </>
          </div>

          {/* ============ button ====================== */}
          <div>
            <div className={styles.submitBtn} onClick={() => UpdatePeople()}>
              <p>DONE</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditPerson;
