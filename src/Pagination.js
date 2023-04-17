import React from 'react';

const Pagination = ({ reposPerPage, totalRepos, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination'>
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => paginate(number)}>
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
