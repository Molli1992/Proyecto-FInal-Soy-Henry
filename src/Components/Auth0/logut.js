import { useAuth0 } from "@auth0/auth0-react";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./logout.css";
import { Input } from 'antd';





export const Logout = () => {
    const { logout } = useAuth0();
    const form = useRef();
    const { user } = useAuth0();

    var formulario = "borrar";

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_p04zgza', 'template_sque1s9', e.target, 'PvHbawws_-6fNNwSb')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        logout();

    };

    return (

        <form ref={form} onSubmit={sendEmail} className="form-email">
            <div>< Input type="text" name="user_name" value={user.name} /></div>
            <div> <Input type="email" name="user_email" value={user.email} /></div>
            <div> <Input type="submit" value="Logout" /></div>
        </form >
    );

};