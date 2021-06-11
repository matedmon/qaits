import { ArrowDropDown } from "@material-ui/icons";
import React from "react";
import styles from "../styles/EditPerson.module.css";

const EditPerson = () => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Edit Person's details</h1>
        </header>

        <section className={styles.form}>
          {/*============= identity =======================*/}
          <div>
            <label htmlFor="id">Identity:</label>
            <br />
            <input
              type="number"
              id="id"
              // defaultValue={product.name}
              // disabled={edit === "name" ? false : true}
              // onChange={(e) => setTextInput(e.target.value)}
            />
            <br />
          </div>

          {/*============= first name =================*/}
          <div>
            <label htmlFor="name">First Name:</label>
            <br />
            <input
              type="text"
              id="name"
              maxLength={30}
              // defaultValue={product.name}
              // disabled={edit === "name" ? false : true}
              // onChange={(e) => setTextInput(e.target.value)}
            />
            <br />
          </div>

          {/*============= surname ====================*/}
          <div>
            <label htmlFor="surname">Surname:</label>
            <br />
            <input
              type="text"
              id="surname"
              maxLength={30}
              // defaultValue={product.name}
              // disabled={edit === "name" ? false : true}
              // onChange={(e) => setTextInput(e.target.value)}
            />
            <br />
          </div>

          {/* ============ age ======================*/}
          <div>
            <label htmlFor="age">Age:</label>
            <br />
            <input
              type="number"
              id="age"
              max={300}
              // defaultValue={product.name}
              // disabled={edit === "name" ? false : true}
              // onChange={(e) => setTextInput(e.target.value)}
            />
            <br />
          </div>

          {/* ============ mobile ==================== */}
          <div>
            <label htmlFor="mobile">Mobile:</label>
            <br />
            <input
              type="number"
              id="mobile"
              maxLength={10}

              // defaultValue={product.name}
              // disabled={edit === "name" ? false : true}
              // onChange={(e) => setTextInput(e.target.value)}
            />
            <br />
          </div>

          {/* ============ sex ===================== */}
          <div>
            <label htmlFor="sex">Sex:</label>
            <br />
            <div
              name="sex"
              id="sex"
              // style={{
              //   pointerEvents: edit === "gender" ? "visible" : "none",
              // }}
              className={styles.dropdownWrapper}
            >
              <div className={styles.dropdownItem}>
                <p>Select...</p>
                <ArrowDropDown fontSize="small" />
              </div>
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => {
                  //   setTextInput("male");
                  //   setGender("male");
                  // }}
                >
                  <p>M</p>
                </div>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => {
                  //   setTextInput("female");
                  //   setGender("female");
                  // }}
                >
                  <p>F</p>
                </div>
              </div>
            </div>
          </div>

          {/* ============ active ===================== */}
          <div>
            <label htmlFor="active">Active:</label>
            <br />
            <div
              name="active"
              id="active"
              // style={{
              //   pointerEvents: edit === "gender" ? "visible" : "none",
              // }}
              className={styles.dropdownWrapper}
            >
              <div className={styles.dropdownItem}>
                <p>Select...</p>
                <ArrowDropDown fontSize="small" />
              </div>
              <div className={styles.dropdown}>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => {
                  //   setTextInput("male");
                  //   setGender("male");
                  // }}
                >
                  <p>True</p>
                </div>
                <div
                  className={styles.dropdownItem}
                  // onClick={() => {
                  //   setTextInput("female");
                  //   setGender("female");
                  // }}
                >
                  <p>False</p>
                </div>
              </div>
            </div>
          </div>

          {/* ============ button ====================== */}
          <div>
            <div className={styles.submitBtn}>
              <p>DONE</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditPerson;
