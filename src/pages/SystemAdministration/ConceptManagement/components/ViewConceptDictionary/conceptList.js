import React , { useState , useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getAPI } from "../../../../../services/index";

const columns = [
  { field: 'id', hide:true },
  { field: 'uuid', headerName: 'ID', width: 90 },
  {
    field: 'display',
    headerName: 'Concept Name',
    width: 170,
    editable: true,
  },
  
  
];

const rows = [
];

export default function DataTable() {

  useEffect(() => {
    let count = 0;
    let url =
    "/concept?v=custom:(uuid,display,answers,datatype,conceptClass:(uuid,display),setMembers:(uuid))";
    let concepts = getAPI(url)
    console.log(concepts)
    /*concepts.forEach(concept => {
      count++;
      rows.id = count;
      rows.uuid = concept.uuid;
      rows.display = concept.display;
    })*/
   }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
