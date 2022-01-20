import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import ReservationsTable from "./ReservationsTable";
import TablesTable from "./TablesTable";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations, listTables, finishTable, updateReservationStatus } from "../utils/api";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  //states
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables]= useState([]);
  const [tablesError, setTablesError]= useState(null);
  const history= useHistory();

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }
  
  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    // setTablesError(null);
    // listTables(abortController.signal)
    //   .then(setTables)
    //   .catch(setTablesError);
    return () => abortController.abort();
  }

  //button handlers
  function prevHandler(event){
    event.preventDefault();
    const newDate= previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function todayHandler(event){
    event.preventDefault();
    history.push(`/dashboard`);
  }

  function nextHandler(event){
    event.preventDefault();
    const newDate= next(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleFinish({target}){
    const tableId =(target.dataset.tableIdFinish);
    const resId= target.dataset.tableReservationId;
    const confirmed = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmed) {
      finishTable(tableId)
      .then(()=>history.go())
      // .then(loadTables)
      // .then(loadReservations)
      .catch(setError);
    }
  }

  function handleCancel({target}){
    const reservationId =(target.dataset.reservationIdCancel);
    const confirmed = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmed) {
      updateReservationStatus(reservationId, "cancelled")
      .then(loadReservations)
      .catch(setError);
    }
  }

  return (
    <main>
      <section>
        <div>
          <h1>Dashboard</h1>
          <button 
          type="button" onClick={prevHandler} className="btn btn-secondary mr-2">Previous
          </button>
          <button 
          type="button" onClick={todayHandler} className="btn btn-secondary mr-2">Today
          </button>
          <button 
          type="button" onClick={nextHandler} className="btn btn-secondary mr-2">Next
          </button>
        </div>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
      </section>
      <div>
        <ErrorAlert error={error} />
        <h2>Reservations</h2>
        <ReservationsTable reservations={reservations} handleCancel={handleCancel}/>
        <h2>Tables</h2>
        <ErrorAlert error={error} />
        <TablesTable tables={tables}handleFinish={handleFinish} />
      </div>
    </main>
  );
}

export default Dashboard;
