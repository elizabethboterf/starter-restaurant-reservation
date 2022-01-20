import React, { useState } from "react";

function Form({submitHandler, cancelHanlder, initialState}){
    const [reservation, setReservation]= useState(initialState);

    function changeHandler({target: {name, value, type}}){
        setReservation((prevState)=>({
            ...prevState,
            [name]: type === "number" ? parseInt(value) : value
        }));
    }

    function onSubmit(event){
        event.preventDefault();
        submitHandler(reservation);
    }

    return(
        <div>
          <form onSubmit={onSubmit} className="create-reservation">
            <fieldset>
              <div className="form-group">
                <label htmlFor="first_name">Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control"
                  value={reservation.first_name}
                  required={true}
                  placeholder="First Name"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  value={reservation.last_name}
                  required={true}
                  placeholder="Last Name"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  className="form-control"
                  rows="4"
                  required={true}
                  placeholder="Mobile Number"
                  value={reservation.mobile_number}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reservation_date">Date</label>
                <input
                  type="date" 
                  placeholder="YYYY/MM/DD" 
                  pattern="\d{2}/\d{2}/\d{4}"
                  id="reservation_date"
                  name="reservation_date"
                  className="form-control"
                  rows="4"
                  required={true}
                  value={reservation.reservation_date}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reservation_time">Time</label>
                <input
                  type="time" 
                  placeholder="HH:MM" 
                  pattern="[0-9]{2}:[0-9]{2}"
                  id="reservation_time"
                  name="reservation_time"
                  className="form-control"
                  rows="4"
                  required={true}
                  value={reservation.reservation_time}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="people">Number of People</label>
                <input
                  type="number" 
                  placeholder="0" 
                  id="people"
                  name="people"
                  className="form-control"
                  rows="4"
                  required={true}
                  value={reservation.people}
                  onChange={changeHandler}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={cancelHanlder}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
    );
}

export default Form;