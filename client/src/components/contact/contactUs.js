import React from 'react'
import "./contactUs.css"
const ContactUs = () => {
  return (
    <>
    <div className="block" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <h1 style={{marginTop: "30px"}}>Contact Us</h1>
      <p style={{marginTop:"40px", fontSize: "2.3vw", fontWeight:"bold",color: "#1976d2",marginBottom:"15px"}}>Get in touch with us</p>
      <p style={{fontSize: "1.8vw", color: "black"}}>If you have any questions or inquiries, feel free to contact us. We would be happy to assist you.</p>
      <p style={{fontSize: "1.8vw", color: "#0077B5",fontWeight:"600"}}>digicomplaints@gmail.com</p>
      <p style={{fontSize: "1.8vw", color: "#0077B5",fontWeight:"600"}}>+91-7008455543/9348383820</p>
      </div>
    </>
  )
}

export default ContactUs;