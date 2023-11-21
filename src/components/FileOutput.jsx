import Table from "./Table.jsx";
import React from "react";

export default function FileOutput({data}) {
  if (!data.data.length) return;
  return (
    <div id="output-container" className="h-box animate-fadeIn">
      <Table
        title='Preview the data'
        header={['Name', 'First Name', 'Middle Name', 'Last Name']}
        values={data.data.map(obj => Object.values(obj))}/>
      <a className="btn btn-outline mt-8 text-md" href={data.url} download>Download Full File</a>
    </div>
  )
}