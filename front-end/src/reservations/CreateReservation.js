import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {createReservation} from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import Form from "./Form";

function CreateReservation(){
    const history=useHistory();
    const initialState= {
      first_name:"",
      last_name:"",
      mobile_number:"",
      reservation_date:"",
      reservation_time:"",
      people: 0
    };
    const [error, setError] = useState(null);

    function submitHandler(reservation){
        createReservation(reservation)
          .then((savedRes)=> formatReservationDate(savedRes))
          .then((savedRes)=>history.push(`/dashboard?date=${savedRes.reservation_date}`))
          .catch(setError);
    }

    function cancelHandler(){
        history.goBack();
    }
    
    return (
        <div>
          <ErrorAlert error={error} />
          <Form submitHandler={submitHandler} cancelHanlder={cancelHandler}
          initialState={initialState}
          />
        </div>
      );  
}
export default CreateReservation;