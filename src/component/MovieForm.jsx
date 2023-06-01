import React, { useEffect, useState } from "react";
import "../styling/MovieForm.css";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../common/api/actions/sagaActions";

const dropdownOptions = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
];

function MovieForm(props) {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  const [reqData, setReqData] = useState({
    title: "",
    description: "",
    duration: 0,
    genre: "Action",
  });
  const dispatch = useDispatch();
  const isEditToggle = useSelector((state) => state.movies.isEdit);
  const editDetails = useSelector((state) => state.movies.editDetail);

  useEffect(() => {
    setReqData(editDetails);
  }, [isEditToggle]);

  const handleSubmit = () => {
    if (isEditToggle)
      dispatch({ type: sagaActions.EDIT_MOVIE, payload: reqData });
    else dispatch({ type: sagaActions.ADD_MOVIE, payload: reqData });
    props.handleFormClose();
  };
  const handleOnChange = (e, type) => {
    let _reqData = { ...reqData };
    _reqData[type] = e.target.value;
    setReqData(_reqData);
  };
  return (
    <div>
      <div className={showHideClassName}>
        <section className="form-main">
          <div className="card-item">
            <div className="card-inner">
              <div className="flexWrapper">
                <h2 className="addmovietitle"> Add Movie Form</h2>
                <div>
                  <img
                    src="./icons/CloseIcon.png"
                    className="closeIcon"
                    onClick={props.handleFormClose}
                    alt="Close Icon"
                  />
                </div>
              </div>

              <div className="form">
                <form>
                  <div className="row">
                    <label className="column">Title</label>
                    <input
                      type="text"
                      className="column"
                      value={reqData.title}
                      onChange={(e) => handleOnChange(e, "title")}
                    />
                  </div>
                  <div className="row">
                    <label className="column">Description</label>
                    <input
                      type="text"
                      className="column"
                      value={reqData.description}
                      onChange={(e) => handleOnChange(e, "description")}
                    />
                  </div>
                  <div className="row">
                    <label className="column">Duration</label>
                    <input
                      type="number"
                      className="column"
                      value={reqData.duration}
                      onChange={(e) => handleOnChange(e, "duration")}
                    />
                  </div>
                  <div className="row">
                    <label className="column">Genre</label>
                    <select
                      name="genre"
                      className="column"
                      value={reqData.genre}
                      onChange={(e) => handleOnChange(e, "genre")}
                    >
                      {dropdownOptions?.map((ele) => {
                        return (
                          <option value={ele} key={ele}>
                            {ele}
                          </option>
                        );
                      })}
                      {/* <option value="Action">Action</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Drama">Drama</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Horror">Horror</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Romance">Romance</option>
                      <option value="Thriller">Thriller</option> */}
                    </select>
                  </div>
                </form>
              </div>
              <div className="cardfooter">
                <div className="card-info">
                  <button className="submitbutton" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieForm;
