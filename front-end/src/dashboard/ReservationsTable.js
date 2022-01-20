import React from "react";
import {Link} from "react-router-dom";
import {formatAsTime } from "../utils/date-time";

function ReservationsTable({reservations, handleCancel}){

  const reservationList = reservations.map((reservation)=>
  { 
    return(
    <tr key={reservation.reservation_id}>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{formatAsTime(reservation.reservation_time)}</td>
      <td>{reservation.people}</td>
      <td>{reservation.status}</td>
      <td>
        <Link to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-primary mr-2">Edit</Link>
      </td>
      <td>
        <button type="button" className="btn btn-primary mr-2" onClick={handleCancel} data-reservation-id-cancel={reservation.reservation_id}> 
        Cancel
        </button>
      </td>
      {
        reservation.status==="booked"?
        (<td><Link to={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-primary mr-2">Seat</Link></td>)
        :
        (<td></td>)
      }
    </tr>
    );
  });

  return(
    <div >
      <table className="table table-dark mt-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>
        <tbody>
          {reservationList}
        </tbody>
      </table>
      </div>
  );
}

export default ReservationsTable;