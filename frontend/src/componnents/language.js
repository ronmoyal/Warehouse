import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar } from 'react-bootstrap';

const Language = () => {
  const [language, setLanguage] = useState('  English');

  const handleClick = () => {
    setLanguage(language === '  English' ? '  עברית' : '  English');
  };

  return (
    <LinkContainer to="/">
      <Navbar.Brand className="brand  border-right" onClick={handleClick}>
        <FontAwesomeIcon
          icon={faGlobe}
          style={{ color: 'white', fontSize: '24px' }}
        />
        {language}
      </Navbar.Brand>
    </LinkContainer>
  );
};

export default Language;
