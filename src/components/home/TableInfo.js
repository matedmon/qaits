import React, { Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import SearchInput from "../../components/SearchInput";
import styles from "../../styles/Home.module.css";

// table headers
const Headers = ({ extraInfo }) => {
  return (
    <tr>
      {extraInfo.headers.map((header, index) => {
        //last value of the headers array is empty
        //show action header only when the file is imported
        if (extraInfo.file && index === extraInfo.headers.length - 1) {
          return (
            <th key={index} style={{ float: "right" }}>
              Action
            </th>
          );
        }

        return <th key={index}>{header}</th>;
      })}
    </tr>
  );
};

// table detail
const PersonDetail = ({ data, errors }) => {
  //details from the database
  if (!errors) return <span>{data}</span>;

  //showing errors on the table from the imported file
  return (
    <>
      {errors.find((err) => err.value === data) ? (
        //we red color any incorrect value and put a question mark where there's no value
        <>
          {data === "" || data === null ? (
            <span style={{ color: "red" }}>?</span>
          ) : (
            <span style={{ color: "red" }}>{data}</span>
          )}
        </>
      ) : (
        <span>{data}</span>
      )}
    </>
  );
};

const PeopleDetails = (props) => {
  const { filteredPeople, routeHistory, setShowModal, extraInfo } = props;
  return (
    <>
      {/* table rows */}
      {filteredPeople.map((person, index) => {
        return (
          <tr key={index}>
            {/* table details (columns) */}
            {Object.entries(person).map(([key, value], i) => {
              //making sure person.errors is not displayed
              //person object comes with extra info from the database which doesn't have to be displayed
              if (key === "errors") return <Fragment key={i}></Fragment>;
              if (key === "_id") return <Fragment key={i}></Fragment>;
              if (key === "updatedAt") return <Fragment key={i}></Fragment>;
              if (key === "createdAt") return <Fragment key={i}></Fragment>;
              if (key === "__v") return <Fragment key={i}></Fragment>;

              return (
                <td key={i}>
                  <PersonDetail data={value} errors={person.errors} />
                </td>
              );
            })}

            {/* only show delete and edit button when there's an imported file */}
            {extraInfo.file ? (
              <>
                {/* delete and edit buttons */}
                <td>
                  <div className={styles.actionBtns}>
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
                </td>
              </>
            ) : null}
          </tr>
        );
      })}
    </>
  );
};

const TableInfo = (props) => {
  const {
    setSearchText,
    extraInfo,
    filteredPeople,
    routeHistory,
    setShowModal,
  } = props;
  return (
    <>
      <SearchInput setSearchText={setSearchText} />
      <Scrollbars universal={true} autoHide autoHeight autoHeightMax={700}>
        <table className={styles.table} cellSpacing="0" cellPadding="0">
          <thead>
            <Headers extraInfo={extraInfo} />
          </thead>
          <tbody>
            <PeopleDetails
              filteredPeople={filteredPeople}
              routeHistory={routeHistory}
              setShowModal={setShowModal}
              extraInfo={extraInfo}
            />
          </tbody>
        </table>
      </Scrollbars>
    </>
  );
};

export default TableInfo;
