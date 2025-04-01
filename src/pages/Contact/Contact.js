import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import gsap from 'gsap';

import useWindowSize from '../../hooks/useWindowResize';
import Button from '../../components/Button/Button';

import { ReactComponent as EmailIcon } from '../../assets/svgs/email-icon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/svgs/phone-icon.svg';
import { ReactComponent as WhatsappIcon } from '../../assets/svgs/whatsapp-icon.svg';

import './Contact.scss';

function Contact() {
  const form = useRef();
  const errorRef = useRef(null);
  const successRef = useRef(null);
  const failedRef = useRef(null);
  const { width } = useWindowSize();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [failedMsg, setFailedMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    if (!isValidEmail(email)) {
      setError("Mmm... that doesn't look like a real email.");
      setSuccessMsg('');
      setIsSending(false);
      return;
    }

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setSuccessMsg('Email sent, I’ll get back to you soon.');
      setError('');
      setFailedMsg('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setFailedMsg('Ugh, something went wrong. Try again?');
      setSuccessMsg('');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const timers = [];

    const animateMessage = (ref, clearFn) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );

        const timer = setTimeout(() => {
          gsap.to(ref.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => clearFn(null),
          });
        }, 2500);

        timers.push(timer);
      }
    };

    if (error) animateMessage(errorRef, setError);
    if (successMsg) animateMessage(successRef, setSuccessMsg);
    if (failedMsg) animateMessage(failedRef, setFailedMsg);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [error, successMsg, failedMsg]);

  return (
    <div className="contact">
      <div className="contact-wrapper">
        <div className="contact-title">
          <p className="highlight"> AVAILABLE FOR FULL-TIME.</p>
          <p className="title-desc">
            INCASE YOU WANT TO <span className="highlight">INTERVIEW</span> OR{' '}
            <span className="highlight">HIRE ME</span>, DROP ME A DM!
          </p>
        </div>

        {width > 480 ? (
          <form className="form-container" ref={form} onSubmit={handleSubmit}>
            <input
              className="email-form"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              required
              className="email-context"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              className={`email-button ${
                isSending
                  ? 'email-api-calling'
                  : isValidEmail(email) && message.trim().length > 0
                  ? 'email-active'
                  : 'email-inactive'
              }`}
              disabled={
                isSending || !isValidEmail(email) || message.trim().length === 0
              }
            >
              {isSending ? 'SENDING...' : 'SEND EMAIL'}
            </Button>
          </form>
        ) : (
          ''
        )}

        <div className="contact-list">
          <div className="email-container">
            <EmailIcon />
            <p className="contact-text">shiang_ee@hotmail.com</p>
          </div>

          <div className="phone-container">
            <PhoneIcon />
            <div className="phone-left">
              <p className="contact-text">+60 18 3715 493</p>
              <Button
                onClick={() =>
                  window.open(
                    'https://wa.me/60183715493',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                <WhatsappIcon />
              </Button>
            </div>
          </div>

          {width < 480 ? <p>EMAIL FEATURE AVAILABLE ON DESKTOP</p> : ''}
        </div>

        {error && (
          <div className="msg error" ref={errorRef}>
            {error}
          </div>
        )}
        {successMsg && (
          <div className="msg success" ref={successRef}>
            {successMsg}
          </div>
        )}
        {failedMsg && (
          <div className="msg fail" ref={failedRef}>
            {failedMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
