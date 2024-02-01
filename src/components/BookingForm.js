import React, { useState } from 'react';

function BookingForm({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      name,
      email,
      phoneNumber,
      bookingDate,
      bookingTime,
      comment,
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));    
    setName('');
    setEmail('');
    setPhoneNumber('');
    setBookingDate('');
    setBookingTime('');
    setComment('');
    onFormSubmit();
  };

  return (
    <>
      <form
        className="flex bg-black rounded-md text-black gap-2 justify-center p-2 flex-col"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col">
          <span className="text-white">Name:</span>
          <input
            placeholder="Enter your FullName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Email:</span>
          <input
            placeholder="Enter your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Phone Number:</span>
          <input
            placeholder="Enter your PhoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Booking Date:</span>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Booking Time:</span>
          <input
            type="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-white">Additional Comments:</span>
          <textarea
            placeholder="What are your Concerns?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <input
          className="bg-black cursor-pointer text-white rounded-sm"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
}

export default BookingForm;
