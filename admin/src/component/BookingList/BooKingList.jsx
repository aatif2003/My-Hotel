import React from "react";
import styles from "./BookingTable.module.scss";
import { Link } from "react-router-dom";

const BooKingList = ({ data, onView, onEdit, onDelete }) => {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Room Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.roomName}</td>
                <td>
                  <Link
                    to={`/booking/${row._id}`} // assuming row.id is the booking id
                    className="btn btn-view"
                  >
                    View
                  </Link>
                  <button onClick={() => onEdit(row)}>Edit</button>{" "}
                  <button onClick={() => onDelete(row)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.noData}>
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooKingList;
