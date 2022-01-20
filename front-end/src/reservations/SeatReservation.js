import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {seatTable, readReservation, listTables, updateReservationStatus} from "../utils/api";

function SeatReservation(){
    const history=useHistory();
    const {reservationId}= useParams();
    
    const [reservation, setReservation]= useState({});
    const [tables, setTables]= useState([]);
    const [tableSat, setTableSat]= useState({table_id:"", reservation_id: reservationId});
    const [error, setError] = useState(null);

    //get reservation by reservationId to compare number of people for reservation to table capacity
    useEffect(loadSeatRes, [reservationId]);

    function loadSeatRes() {
        const abortController = new AbortController();
        setError(null);
        listTables(abortController.signal)
            .then(setTables)
            .catch(setError);

        readReservation(reservationId, abortController.signal)
            .then(setReservation)
            .catch(setError);

        return () => abortController.abort();
    }
  
    const optionsList= tables.map((table)=>{
        return(
            <option key={table.table_id} value={table.table_id}>{`${table.table_name} - ${table.capacity}`}</option>  
        );
    });

    function changeHandler({target: {name, value}}){
        setTableSat({
          ...tableSat,
          [name]: parseInt(value)});
    }

    async function submitHandler(event){
        event.preventDefault();
    
        const foundTable= tables.find((table)=>{
          if(table.table_id===tableSat.table_id){
            return table;
          }
          setError({message: `Table not found`})
          return 0;
        });
      
        if(foundTable.capacity >= reservation.people){
        await seatTable(foundTable.table_id, reservation.reservation_id, )
          .then(()=>history.push(`/dashboard?date=${reservation.reservation_date}`))  
        }else{
           setError({message: "Capacity doesn't match."}); 
        }    
    }

    function onCancel(){
        history.goBack();
    }
    
    return (
        <div>
          <ErrorAlert error={error} />
          <form onSubmit={submitHandler} >
          <fieldset>
              <div className="form-group">
              <label htmlFor="table_id">Choose a table:</label>
                <select 
                name="table_id" id="table_id" 
                className="form-control"
                onChange={changeHandler}
                >
                <option >Select an option</option> 
                {optionsList}
                </select>
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

export default SeatReservation;