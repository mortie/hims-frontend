import React, { useState } from 'react';
import axios from "axios";

import { DataGrid } from '@material-ui/data-grid';
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';


const createData = (uuid,
  eligibility,
  vaccines,
  dateCreated,
  comments,
  id
) => {
  return { uuid,eligibility, vaccines, dateCreated, comments, id };
};

export default function ImmunizationTable(props) {

  const rowpros = props.rows
  const patientData = props.patientData;
  var storedata = [];
  let id = 0;
  var elig = "";
  var uuidval = "";
  var date = new Date();

  Object.entries(rowpros.answers).map(([key, value]) => {

    elig = value.display
    uuidval = value.uuid

    var vaccine = ""
    var comment = "Enter Comments"
    var vac = {}

      Object.entries(value.answers).map(([key, values]) => {
        if (values.datatype.display == "N/A") {
            vac["vaccine_" + key] = values.display
        }
      })

    if (Object.entries(vac).length != 0) {
      storedata.push(
        createData(
          uuidval,
          elig,
          vac,
          date,
          comment,
          id
        )
      );
      id = id + 1
    }
  })
  var [immuneData, setImmuneData] = useState(storedata);
  var [successcheck, setSuccesscheck] = useState(false);

  const columns = [
        {
      field: 'uuid', headerName: 'UUID', hide:true
    },
    {
      field: 'eligibility', headerName: 'Eligibility', width: 180,
      cellClassName: 'super-app-theme--cell',
      headerClassName:'super-app-theme--cell',
},
    {
      field: 'vaccines', headerName: 'Vaccines', width: 300,
      cellClassName: 'super-app-positive',
      headerClassName:'super-app-positive',

      renderCell: (params) => {
        return(
          <div>
            {
              Object.entries(params.value).map(([key, value], i) =>
                <Typography key={i} value={key}>{value}</Typography>
              )
            }
          </div>
        )
      }
    },
  {
    field: 'dateCreated',
    headerName: 'Date',
    type: 'date',
    width: 250,
    editable: true,
    valueFormatter: (params) => {
      var d = new Date(params.value);
      params.value = [('0' + d.getDate()).slice(-2),
  ('0' + (d.getMonth() + 1)).slice(-2),
  d.getFullYear(),
].join('-');
    }
  },
  {
    field: 'comments',
    headerName: 'Comments',
    width: 450,
    editable: true,
  },
  ];



  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {
      setSuccesscheck(false)
      if (field == 'dateCreated') {
        let datavalue = props.value;
        const updatedRows = immuneData.map((row) => {
          if (row.id === id) {
            console.log(" Rowsss : ",row, "data Value : ",datavalue)
            row['dateCreated'] = datavalue
          }
          // updateImmunzationData(row)
          setSuccesscheck(true)
          return row;
        });
        setImmuneData(updatedRows)
      }
      else if (field == 'comments') {
        let datavalue = props.value;
        const updatedRows = immuneData.map((row) => {
          if (row.id === id) {
            row['comments'] = datavalue
          }
          // updateImmunzationData(row)
          setSuccesscheck(true)
          return row;
        });
        setImmuneData(updatedRows)
      }
    },
    [immuneData],
  );

  const handleCellClick = (param, event) => {
  console.log(param);
    console.log(event);
    setSuccesscheck(false)
  // if (param.colIndex === 2) {
  //   event.stopPropagation();
  // }
  };

  return (
    <div>
    <div style={{ height: 400, width: '100%' }} >
      <DataGrid rows={immuneData}
        columns={columns}
        rowHeight={150}
        onEditCellChangeCommitted={handleEditCellChangeCommitted}
        showColumnRightBorder={true}
        showCellRightBorder={true}
          onCellClick={handleCellClick}
          hideFooterPagination={true}
          hideFooter={true}

      />
      </div>
      {successcheck &&
        <Alert severity="success">Saved Successfully!</Alert>
      }
      </div>

  );
}
