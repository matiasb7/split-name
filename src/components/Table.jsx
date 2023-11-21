import React from 'react';

function Table({ title, header, values }) {
  return (
    <div className="overflow-x-auto">
      {title && <h2 className="text-xl font-bold mb-5">{title}</h2>}
      <table className="table">
        {/* head */}
        <thead>
        <tr className='border-gray-500'>
          {
            header.map((item, index) => <th className='text-lg' key={index}>{item}</th>)
          }
        </tr>
        </thead>
        <tbody>
        {
          values.map((row, rowIndex) => {
            row.map((item) => <td>{item}</td>)
            return (
              <tr key={rowIndex} className='border-gray-600 hover:bg-base-100'>
                {
                  row.map((item, index) => <td key={index}>{item}</td>)
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
