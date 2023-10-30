import React, { useEffect, useState } from "react";
import {
  ContactContainer,
  ContactForm,
  FormButton,
  FormInput,
  FormTextarea,
} from "./contact.styles";

const Contact = ({ listing }) => {
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseForm = () => {
    setLandlord(null);
  };

  /**
   // TODO - Add email functionality
   */

  useEffect(() => {
    const fetchLandlord = async () => {
      console.log(listing.userRef);
      try {
        const res = await fetch(`${URL}/api/user/${listing.userRef}`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
        handleShowForm();
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <ContactContainer id='overlay'>
          <ContactForm>
            <p>
              Contact <span className='font-semibold'>{landlord.username}</span>{" "}
              for <span className='font-semibold'>"{listing.title}"</span>
            </p>

            <FormInput
              type='text'
              name='name'
              id='name'
              placeholder='Enter your name...'
            />

            <FormInput
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email address...'
            />
            <FormTextarea
              name='message'
              id='message'
              rows='5'
              cols='50'
              value={message}
              placeholder='Enter your message here...'
              onChange={handleChange}
            ></FormTextarea>
            <FormButton type='button' onClick={() => handleCloseForm()}>
              Send Message
            </FormButton>
            <FormButton
              type='button'
              className='bg-red-700'
              onClick={() => handleCloseForm()}
            >
              Cancel
            </FormButton>
          </ContactForm>
        </ContactContainer>
      )}
    </>
  );
};

export default Contact;
