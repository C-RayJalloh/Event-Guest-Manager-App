/* eslint-disable react/prop-types */
import { useState } from "react";

const initialGuests = [
  {
    id: 1,
    name: "Jahrulo Ray",
    phone: "123-234-4424",
    email: "jahruloRay@gmail.com",
    attended: false,
  },
  {
    id: 2,
    name: "Johny Molto",
    phone: "123-456-4628",
    email: "johnymolto@gmail.com",
    attended: false,
  },
  {
    id: 3,
    name: "Satu Jay",
    phone: "123-456-4628",
    email: "satujay@gmail.com",
    attended: false,
  },
];

export default function App() {
  const [guests, setGuests] = useState(initialGuests, []);

  function handleAddGuest(newGuest) {
    setGuests((guests) => [...guests, newGuest]);
  }

  function handleUpdateGuest(id) {
    setGuests((guests) =>
      guests.map((guest) =>
        guest.id === id ? { ...guest, attended: !guest.attended } : guest
      )
    );
  }

  function handleDeleteGuest(id) {
    setGuests((guests) => guests.filter((guest) => guest.id !== id));
  }

  return (
    <div className="app">
      <Heading />
      <SortOperations addGuest={handleAddGuest} />
      <GuestList
        guest={guests}
        updateGuest={handleUpdateGuest}
        deleteGuest={handleDeleteGuest}
      />
      {/* <GuestForm  addGuest={handleAddGuest}/> */}
      <Stats guests={guests}/>
    </div>
  );
}

function Heading() {
  return (
    <div className="header">
      <h1>Welcome to the Event Guest Manager App 👩🏽‍💻</h1>
      <p>This application will help you manage your guest list</p>
    </div>
  );
}

function SortOperations({ addGuest }) {
  return (
    <div className="sortActions">
      <select name="guest">
        <option value="name">Sort by A-Z</option>
        <option value="attended">Sort by attended</option>
        <option value="attendance">Sort by Not attend</option>
      </select>
      <button>Clear List</button>
      <AddButton addGuest={addGuest} />
    </div>
  );
}

function GuestList({ guest, updateGuest, deleteGuest }) {
  return (
    <div className="guestTable">
      <table>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Attendance</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {guest.map((guest) => (
            <tr key={guest.id}   style={
              guest.attended ? {textDecoration: 'line-through'} : {}
              }>
              <td>{guest.name}</td>
              <td>{guest.phone}</td>
              <td>{guest.email}</td>
              <td>
                <input
                  type="checkbox"
                  value={guest.attended}
                  onChange={() => updateGuest(guest.id)}
                />
              </td>
              <td>
                <button onClick={() => deleteGuest(guest.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddButton({ addGuest }) {
  const [showForm, setShowForm] = useState(false);

  function handleFormDisplay() {
    setShowForm((showForm) => !showForm);
  }
  return (
    <div className="">
      {showForm && <GuestForm addGuest={addGuest} />}
      <button onClick={handleFormDisplay}>
        {showForm ? "Cancel" : "Add New"}
      </button>
    </div>
  );
}

function GuestForm({ addGuest }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function HandleSubmit(e) {
    e.preventDefault();

    const newGuest = {
      id: Date.now(),
      name,
      phone,
      email,
      attended: false,
    };

    addGuest(newGuest);
    console.log(newGuest);
    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <div className="add-form">
      <form onSubmit={HandleSubmit}>
        <label htmlFor="name">Guest Name:</label>
        <input
          type="text"
          placeholder="Enter fullName"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          placeholder="Enter phone No."
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter email address"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={HandleSubmit}>Add</button>
      </form>
    </div>
  );
}

function Stats({guests}) {

  if(!guests.length) return (
    <div className="stats">
      <em>No guests found, add guest</em>
    </div>
  );

  const numGuest = guests.length;
  const NotAttendedGuest = guests.filter((guest) => guest.attended).length;
  const notAttendedPercentage = Math.round((NotAttendedGuest / numGuest) * 100);

  return (
    <div className="stats">
      {notAttendedPercentage === 100 ? (
        <strong>Sadly...No one attend the event!</strong>
      ): (
        <em>You have {numGuest} guest on the list and {NotAttendedGuest} people did not attend, total of {notAttendedPercentage}% absent ☹️ </em>
      )}
    </div>
  );
}
