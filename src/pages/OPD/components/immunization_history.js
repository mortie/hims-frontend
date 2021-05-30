import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@material-ui/x-grid-data-generator';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.negative': {
      backgroundColor: 'rgba(157, 255, 118, 0.49)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app-positive': {
      backgroundColor: '#d47483',
      color: '#1a3e72',
      fontWeight: '600',
    },
  },
});

const createData = (
  eligibility,
  vaccines,
  dateCreated,
  comments,
  id
) => {
  return { eligibility, vaccines, dateCreated, comments, id };
};

export default function BasicEditingGrid(props) {

  const rowpros = props.rows.answers
  var storedata = [];
  let id = 0;
  Object.entries(rowpros).map(([key, value]) => {
    var elig = value.display
    var vaccine = ""
    var date = ""
    var comment = ""
    var vac = {}
    Object.entries(value.answers).map(([key, values]) => {
      if (values.datatype.display == "N/A") {
        vac["vaccine_"+key] = values.display
        // if (!vaccine) {
        //   vaccine = values.display
        // }
        // else {
        //   vaccine = vaccine + "," + values.display
        // }
      }
    })

  storedata.push(
    createData(
      elig,
      vac,
      date,
      comment,
      id
    )
    );
    id = id +1

  })
  var [searchData, setsearchData] = useState(storedata);


  const columns = [
    {
      field: 'eligibility', headerName: 'Eligibility', width: 180,
      cellClassName: 'super-app-theme--cell',
      headerClassName:'super-app-theme--cell',
},
    {
      field: 'vaccines', headerName: 'Vaccines', width: 250,
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
    width: 180,
    editable: true,
  },
  {
    field: 'comments',
    headerName: 'Comments',
    width: 220,
    editable: true,
  },
  ];

  const rows = [
  {
    id: 1,
    eligibility: randomTraderName(),
    vaccines: 25,
    dateCreated: randomCreatedDate(),
    comments: randomUpdatedDate(),
  },
  {
    id: 2,
    eligibility: randomTraderName(),
    vaccines: 36,
    dateCreated: randomCreatedDate(),
    comments: randomUpdatedDate(),
  },
];
  const classes = useStyles();

  return (
    <div style={{ height: 800, width: '100%' }} className={classes.root}>
      <DataGrid rows={searchData} columns={columns} rowHeight={180} />
    </div>
  );
}
