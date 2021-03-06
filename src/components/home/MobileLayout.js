import React, { Fragment } from "react";
import { ArrowDropDown } from "@material-ui/icons";
import styles from "../../styles/Home.module.css";
import SearchInput from "../../components/SearchInput";
import { Scrollbars } from "react-custom-scrollbars-2";

const MobileLayout = (props) => {
  const {
    filteredPeople,
    routeHistory,
    setSearchText,
    viewDetails,
    setViewDetails,
    setShowModal,
    extraInfo,
  } = props;

  //open dropdown menu
  const openMenu = (id) => {
    setViewDetails((prev) => {
      if (prev === id) return null;
      return id;
    });
  };

  return (
    <div className={styles.mobile}>
      {/* search input  */}
      <div style={{ position: "relative" }}>
        <SearchInput setSearchText={setSearchText} />
      </div>

      {/* all people list */}
      <div>
        <Scrollbars universal={true} autoHide autoHeight autoHeightMax={500}>
          {filteredPeople.map((person, index) => {
            return (
              <div key={index} className={styles.dropdown}>
                <div
                  className={styles.dropdownTitle}
                  onClick={() => openMenu(person.identity)}
                >
                  <p>
                    {person.firstname} {person.surname}
                  </p>
                  <ArrowDropDown fontSize="small" />
                </div>

                {/* dropdown menu */}
                <div
                  style={{
                    display: viewDetails === person.identity ? "block" : "none",
                  }}
                  className={styles.dropdownMenu}
                >
                  {/* hide the buttons if there's no imported file */}
                  {extraInfo.file ? (
                    <div>
                      {/* edit and delete buttons */}
                      <div className={styles.btns}>
                        <p
                          className={styles.editBtn}
                          onClick={() =>
                            routeHistory.push({
                              pathname: "/editperson",
                              state: {
                                person,
                              },
                            })
                          }
                        >
                          Edit
                        </p>
                        <p
                          className={styles.deleteBtn}
                          onClick={() => setShowModal(person.identity)}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* dropdown items */}
                  {Object.entries(person).map(([key, value], i) => {
                    //making sure person.errors is not displayed
                    //person object comes with extra info from the database which doesn't have to be displayed
                    if (key === "errors") return <Fragment key={i}></Fragment>;
                    if (key === "_id") return <Fragment key={i}></Fragment>;
                    if (key === "updatedAt")
                      return <Fragment key={i}></Fragment>;
                    if (key === "createdAt")
                      return <Fragment key={i}></Fragment>;
                    if (key === "__v") return <Fragment key={i}></Fragment>;
                    return (
                      <div key={i} className={styles.dropdownItem}>
                        <p className={styles.title}>{key}</p>
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

export default MobileLayout;
