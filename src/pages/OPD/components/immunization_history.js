import React, { useState } from 'react';
import axios from "axios";

import { DataGrid } from '@material-ui/data-grid';
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


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
  const classes = useStyles();

  var storedata = [];
  let id = 0;
  var elig = "";
  var uuidval = "";
  var date = new Date();

  Object.entries(rowpros.answers).map(([key, value]) => {

    elig = value.display
    uuidval = value.uuid

    var vaccine = ""
    var comment = ""
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
    },
    renderCell: (params) => {
        return(
          <TextField
          // variant="outlined"
          label="Date"
          type="date"
          margin="dense"
          name="surgicalDate"
          id="surgicalDate"
          defaultValue=""
          maxDate={new Date()}
          InputLabelProps={{
          shrink: true,
          }}
          // className={classes.field}
          onChange = {(e)=>handleCellClick(e,params)}
          />
        )
      }
    },

  {
    field: 'comments',
    headerName: 'Comments',
    width: 450,
    editable: true,
    renderCell: (params) => {
      console.log(" Params Value ",params.value)
        return(
          <TextField
          // variant="outlined"
          label="Comment"
          type="text"
          margin="dense"
          name="surgicalDate"
          id="surgicalDate"
          InputLabelProps={{
          shrink: true,
          }}
          // className={classes.field}
          value = {params.value}
          onChange={(e) => handleCellClick(e, params)}
          />
        )
      }
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

  const handleCellClick = (event,param) => {
    console.log(" cell Event values ", event.target.value)
    console.log(" cell  Param ", param)

    var cVal = {
      "name": param.row.uuid,
      "value":event.target.value,
    }
  // if (param.colIndex === 2) {
  //   event.stopPropagation();
  // }
    console.log(" Cell values DICT ",cVal)
    props.onChange(event,cVal)

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
          // onCellClick={handleCellClick}
          hideFooterPagination={true}
          hideFooter={true}

      />
      </div>

      </div>

  );
}
