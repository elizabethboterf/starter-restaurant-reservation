import React, {useEffect, useState} from "react";
import ErrorAlert from "../layout/ErrorAlert";
import {listTables} from "../utils/api";

function TablesTable({tables, handleFinish}){
  //const [tables, setTables]= useState([]);
  //const [error, setError]= useState(null);

  // function loadTables() {
  //   const abortController = new AbortController();
  //   setError(null);
  //   listTables(abortController.signal)
  //     .then(setTables)
  //     .catch(setError);
  //   return () => abortController.abort();
  // }

  // useEffect(loadTables, []);
  console.log(tables);

  const tableList = tables.map((table)=>
    { 
      const status = table.reservation_id===null ? ("free") : ("occupied");
      return(
      <tr key={table.table_id}>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td className={`data-table-id-status=${table.table_id}`}>{status}</td>
        <td data-table-id-finish={table.table_id}>
          <button data-table-id-finish={table.table_id} data-table-reservation-id={table.reservation_id}className="btn btn-primary mr-2" onClick={handleFinish}>Finish</button>
        </td>
      </tr>
    );
    });
    

  return(
    <div>
      {/* <h2>Tables</h2>
      <ErrorAlert error={error} /> */}
        <table className="table table-dark mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>
          {tableList}
        </tbody>
      </table>
      </div>
  );
}

export default TablesTable;