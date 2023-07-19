import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
          variant={currentPage === page ? 'primary' : 'outline-primary'}
          style={{ marginRight: '2px' }}
        >
          {page}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
