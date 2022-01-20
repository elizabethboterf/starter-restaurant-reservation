import React, {useState, useEffect} from "react";
import {useHistory, useParams, } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {updateReservation, readReservation} from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import Form from "./Form";

function EditReservation(){
    const initialState= {
        first_name:"",
        last_name:"",
        mobile_number:"",
        reservation_date:"",
        reservation_time:"",
        people:""
    };

    const history=useHistory();
    const {reservationId}= useParams();
    const [reservation, setReservation]= useState(initialState);
    const [error, setError] = useState(null);

    useEffect(loadReservation, [reservationId]);
     console.log(reservation);
    function loadReservation() {
        const abortController = new AbortController();
        setError(null);

        readReservation(reservationId, abortController.signal)
            .then(setReservation)
            .catch(setError);

        return () => abortController.abort();
    }

    function submitHandler(reservation){
        updateReservation(reservation.reservation_id, reservation)
          .then((savedRes)=> formatReservationDate(savedRes))
          .then(()=>history.goBack())
          .catch(setError);
    }

    function cancelHandler(){
        history.goBack();
    }

    const child = reservation.reservation_id ? 
    (
        <Form submitHandler={submitHandler} cancelHanlder={cancelHandler} initialState={reservation} />
    ) : 
    (
        <p>Loading...</p>
    );
    
    return (
        <div>
          <ErrorAlert error={error} />
          {child}
        </div>
      );  
}

export default EditReservation;