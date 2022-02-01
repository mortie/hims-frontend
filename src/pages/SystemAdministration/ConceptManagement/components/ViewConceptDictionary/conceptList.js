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

  var [rows, setRows] = useState([]);
  useEffect(async() => {
    let count = 0;
    let url =
    "/concept?set=true&v=custom:(id,uuid,display,answers,set)";
    let concepts = await getAPI(url).then((response) => {
      const res = response.data.results;
        return res;
    })
    concepts = concepts.filter((item) => item.set === true);
    console.log(concepts);
    const conceptList = concepts.map((result,index) => {
      return {
        id:index,
        uuid:result.id,
        display:result.display
    }})
   
      setRows(conceptList);
    console.log(concepts)
   
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
