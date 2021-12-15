import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {createReservation as createRes} from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
//import {today} from "../utils/date-time";

function CreateReservation(){
    const history=useHistory();
    const [reservation, setReservation]= useState({});
    const [error, setError] = useState(null);

    function changeHandler({target: {name, value}}){
        setReservation((prevState)=>({
            ...prevState,
            [name]: value
        }));
    }

    function submitHandler(event){
        event.preventDefault();
          createRes(reservation)
          .then((savedRes)=> formatReservationDate(savedRes))
          .then((savedRes)=>history.push(`/dashboard?date=${savedRes.reservation_date}`))//how to history with query
          .catch(setError);
    }
    function onCancel(){
        history.goBack();
    }
    
    return (
        <div>
          <ErrorAlert error={error} />
          <form onSubmit={submitHandler} className="create-reservation">
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
                  placeholder="Date"
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
                  type="text" 
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
                onClick={onCancel}
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
export default CreateReservation;