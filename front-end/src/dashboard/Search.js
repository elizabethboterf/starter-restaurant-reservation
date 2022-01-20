import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "./ReservationsTable";
import { listReservations } from "../utils/api";



function Search() {
  //states
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [newPhone, setNewPhone]= useState({mobile_number:""});

  function loadSearch() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(newPhone, abortController.signal)
      .then(setReservations)
      .then(console.log)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //button handlers
  function changeHandler({target: {value}}){
    setNewPhone({
        mobile_number: value
    });
    }

    function findHandler(event){
        event.preventDefault();
        loadSearch();
    }

  return (
    <main>
      <div>
          <ErrorAlert error={reservationsError} />
          <form onSubmit={findHandler} className="search-reservation mt-2">
            <fieldset>
              <div className="form-group">
                <label htmlFor="mobile_number">Phone Number:</label>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  className="form-control"
                  value={newPhone.mobile_number}
                  required={true}
                  placeholder="Enter a customer's phone number"
                  onChange={changeHandler}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Find
              </button>
            </fieldset>
          </form>
        </div>
        <div>
            {reservations[0] ?
            (<ReservationsTable reservations={reservations} />)
            :
            (<div className="mt-2"><h3>No Reservations Found</h3></div>)}
            
        </div>
    </main>
  );
}

export default Search;
