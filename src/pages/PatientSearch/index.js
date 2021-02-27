import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";

import { DataGrid } from '@material-ui/data-grid';
import CustomizedMenus from "./ActionButton";


import axios from "axios";
import styles from "./styles";
import "./styles.css";



const useStyles = makeStyles(styles);

function createData(identifier: any, name: any, phone: any, gender: any, age: any, address: any, lvd: any, action: any,id:any) {
  
    return { identifier, name, phone, gender, age, address, lvd, action,id };
    
}


export default function PatientSearch(props) {

  var [searchDetails, setsearchDetails] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    lvd: "",
  });
  var [searchData, setsearchData] = useState([]);
  var [loading, setLoading] = useState(false);
  var [errors, setErrors] = useState({ phoneData: true, nameData: true });
  var [isDataPresent, setisDataPresent] = useState(false);
  var [phoneData, setphoneData] = useState(false);
  var [nameData, setnameData] = useState(false);
  var [apihit, setapihit] = useState(false);

  const columns = [
    { field: 'identifier', headerName: 'Patiend ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 115 },
    {
      field: 'gender',
      headerName: 'Gender',
      type: 'number',
      width: 80,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 70,
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'string',
      width: 200,
      height: 300,
    },
    {
      field: 'lvd',
      headerName: 'Last Visited',
      type: 'string',
      width: 120,
    },
    {
      field: 'action',
      headerName: 'Action',
      type: 'string',
      width: 80,
      renderCell: (params) => (
        <strong>
          <CustomizedMenus patiendData={params}/>
        </strong>
      ),
    },

  ]

  const validateForm = () => {
    setErrors({
      phoneData: !searchDetails.phone ? false : true,
      nameData: !searchDetails.firstName ? false : true,
    });

    if (searchDetails.phone) {
      return false;
    }
    else if (searchDetails.firstName) {
      return false;
    }
    else{return true}
  };

  var multiFilter = (products, filters) => {
    return products.filter((product) => {
      return Object.entries(filters).every(([filterProperty, filterValues]) => {
      switch(Object.prototype.toString.call(product[filterProperty])){
      case '[object Object]':
      return Object.entries(filterValues).every(([extFilterProperty, extFilterValue]) => {
      return new Map(Object.entries(product[filterProperty])).get(extFilterProperty) === extFilterValue;
      });
      case '[object Array]':
      return product[filterProperty].some((productValue) => {
      return filterValues.includes(productValue);
      });
      default:
      return filterValues.includes(product[filterProperty]);
      }
      });
    });
  };
    
  var filters = {};

  const search = (key) => {
    setLoading(true)

    validateForm()         

    let firstName = searchDetails.firstName.toUpperCase();
    const phone = searchDetails.phone;
    const lastName = searchDetails.lastName;
    const age = searchDetails.age;
    const gender = searchDetails.gender;
    const lvd = searchDetails.lvd;

    let searchDataAlready = searchData;

    let isDataAlready = false;
    let alreadystoredata = [];
    if (searchDataAlready.length > 0 && isDataPresent == true) {
      isDataAlready = true;
    }
    if (isDataAlready) {
      if (age) {
        filters['age'] = [age]
      }
      if (gender) {
        filters['gender'] = [gender.toUpperCase()]

      }
      if (firstName) {
        filters['name'] = [firstName.toUpperCase()]
      }
      if (phone) {
        filters['phone'] = [phone]
      }
      let filterOutput = multiFilter(searchDataAlready, filters)
      if (filterOutput.length > 0) {
        alreadystoredata = filterOutput
      }
      if (alreadystoredata.length > 0) {
        setsearchData(alreadystoredata);
        setisDataPresent(true)
      }
      else {
        let param = firstName;
        var username = "admin"
        var password = "Admin123"
        if (firstName) {
          param = firstName
        }
        if (phone) {
          param = phone;
        }
        if (firstName && phone) {
          param = phone
        }
        if (firstName || phone) {
          setnameData(false)
          setphoneData(false)

          const headers = {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
          };
          const url = `https://ln3.hispindia.org/openmrs/ws/hisp/rest/patient_search?name=${param}`
          axios
            .get(url, { headers: headers })
            .then((response) => {
              setapihit(true)
              var phoneNo = '';
              var searchdatanew = [];
              var visitdate = ''
              setsearchData([]);
              var storedata = [];
              // searchdatanew = searchData;

              for (let i = 0; i < response.data.length; i++) {
                var addressrarr = [];
                searchdatanew.push(response.data)
                let identifierid = searchdatanew[0][i]["identifier"];
                let nameval = searchdatanew[0][i]["name"].toUpperCase()
                let genval = searchdatanew[0][i]["gender"]
                let ageval = searchdatanew[0][i]["age"]
                if (searchdatanew[0][i]["address"]) {
                  let addr1 = searchdatanew[0][i]["address"]["Address1"]
                  let addr2 = searchdatanew[0][i]["address"]["Address2"]
                  let district = searchdatanew[0][i]["address"]["City Village"]
                  let country = searchdatanew[0][i]["address"]["Country"]
                  let pincode = searchdatanew[0][i]["address"]["Postal Code"]
                  let statecode = searchdatanew[0][i]["address"]["State Province"]
                  // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                  let addr = district + " - " + statecode
                  addressrarr.push(addr)
                }
                if (searchdatanew[0][i]["person_attributes"]) {
                  phoneNo = searchdatanew[0][i]["person_attributes"]["Telephone Number"]
                }
                if (searchdatanew[0][i]["visit_date"] != undefined) {
                  visitdate = searchdatanew[0][i]["visit_date"]
                }
                else {
                  visitdate = "N-A"
                }
                let id = i

                storedata.push(createData(identifierid, nameval, phoneNo,
                  genval, ageval, addressrarr[0], visitdate, "", id
                ))
              }

              if (storedata.length > 0) {
                setsearchData([])
                              if (age) {
                filters['age'] = [age]
              }
              if (gender) {
                  filters['gender'] = [gender.toUpperCase()]

              }
              if (firstName) {
                  filters['name'] = [firstName]
              }
              if (phone) {
                filters['phone'] = [phone]
              }
              let filterOutput = multiFilter(storedata, filters)
                if (filterOutput.length > 0) {
                  storedata = filterOutput
                  setsearchData(storedata);
                } else {
                  setsearchData(storedata)
                }
                setisDataPresent(true);
                setLoading(false);

              }
              else {
                setisDataPresent(false)
              }
              setLoading(false)
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          setnameData(true)
          setphoneData(true)
          setLoading(false)
        }
      }
    }


    else {
      let param = firstName;
      var username = "admin"
      var password = "Admin123"
      if (firstName) {
        param = firstName
      }
      if (phone) {
        param = phone;
      }
      if (firstName && phone) {
        param = phone
      }
      if (firstName || phone) {
        setnameData(false)
        setphoneData(false)

        const headers = {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        };
        const url = `https://ln3.hispindia.org/openmrs/ws/hisp/rest/patient_search?name=${param}`
        axios
          .get(url, { headers: headers })
          .then((response) => {
            setapihit(true)
            var phoneNo = '';
            var searchdatanew = [];
            var visitdate = ''
            setsearchData([]);
            searchdatanew = searchData;
            var storedata = [];

            for (let i = 0; i < response.data.length; i++) {
              var addressrarr = [];
              searchdatanew.push(response.data)
              let identifierid = searchdatanew[0][i]["identifier"];
              let nameval = searchdatanew[0][i]["name"].toUpperCase()
              let genval = searchdatanew[0][i]["gender"]
              let ageval = searchdatanew[0][i]["age"]
              if (searchdatanew[0][i]["address"]) {
                let addr1 = searchdatanew[0][i]["address"]["Address1"]
                let addr2 = searchdatanew[0][i]["address"]["Address2"]
                let district = searchdatanew[0][i]["address"]["City Village"]
                let country = searchdatanew[0][i]["address"]["Country"]
                let pincode = searchdatanew[0][i]["address"]["Postal Code"]
                let statecode = searchdatanew[0][i]["address"]["State Province"]
                // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                let addr = district + " - " + statecode
                addressrarr.push(addr)
              }
              if (searchdatanew[0][i]["person_attributes"]) {
                phoneNo = searchdatanew[0][i]["person_attributes"]["Telephone Number"]
              }
              if (searchdatanew[0][i]["visit_date"] != undefined) {
                visitdate = searchdatanew[0][i]["visit_date"]
              }
              else {
                visitdate = "N-A"
              }
              let id = i

              storedata.push(createData(identifierid, nameval, phoneNo,
                genval, ageval, addressrarr[0], visitdate, "", id
              ))
            }

            if (storedata.length > 0) {
              setsearchData([]);
              if (age) {
                filters['age'] = [age]
              }
              if (gender) {
                  filters['gender'] = [gender.toUpperCase()]

              }
              if (firstName) {
                  filters['name'] = [firstName]
              }
              if (phone) {
                filters['phone'] = [phone]
              }
              let filterOutput = multiFilter(storedata, filters)
              if (filterOutput.length > 0) {
                storedata = filterOutput
                setsearchData(storedata);
              }
              else {
                  setsearchData(storedata);
              }
              setisDataPresent(true)

            }
            else {
              setisDataPresent(false)
            }
            setLoading(false)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        setnameData(true)
        setphoneData(true)
        setLoading(false)
      }
    }
  }
  
  
  const classes = useStyles();
  const searchdat = searchData;
  console.log("SEARCH DATA",searchdat)
  if (isDataPresent) {
    return (

      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} >
              <Grid item xs={3}>
                <TextField
                  error={!errors.phoneData && !errors.nameData}
                  helperText={(!errors.phoneData && !errors.nameData) && "Phone is required!" }
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, phone: e.target.value })
                  }
                  value={searchDetails.phone}
                />
              </Grid>
              <Grid item sm={3} >
                <TextField
                  error={!errors.phoneData && !errors.nameData}
                  helperText={(!errors.phoneData && !errors.nameData) && "Name is required!" }
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name/Identifier"
                  autoFocus
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, firstName: e.target.value })
                  }
                  value={classes.firstName}
                />
              </Grid>
              <Grid item xs={3} >
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, lastName: e.target.value })
                  }
                  value={classes.lastName}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, age: e.target.value })
                  }
                  value={classes.age}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" display="block" gutterBottom className="genderLabel">
                  Gender &nbsp;
                  </Typography>
                <FormControl>
                  <RadioGroup className="gendergroup" value={classes.gender} onChange={(e) =>
                    setsearchDetails({ ...searchDetails, gender: e.target.value })
                  }>
                    <FormControlLabel
                      control={<Radio />}
                      label="Female"
                      value="f"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Male"
                      value="m"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Other"
                      value="o"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="date"
                  label="Late visited"
                  type="date"
                  defaultValue=""
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, lvd: e.target.value })
                  }
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className='searchbtn'
                size="small"
                onClick={() =>
                  search()}
              >
                Search
                </Button>
            </Grid>
          </form>
        </div>
        <br></br>
<div style={{ height: 500, width: '100%' }}>
      <DataGrid rowHeight={40} wrap="wrap" rows={searchdat} columns={columns} pageSize={10} density="standard" />
    </div>
      </Container>
      
    );
  }
  

  else {
    return (

      <Container component="main" maxWidth="lg">
      
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} >
              <Grid item xs={3}>
                <TextField
                  error={!errors.phoneData && !errors.nameData}
                  helperText={(!errors.phoneData && !errors.nameData) && "Phone is required!" }
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, phone: e.target.value })
                  }
                  value={searchDetails.phone}
                />
              </Grid>
              <Grid item sm={3} >
                <TextField
                  error={!errors.phoneData && !errors.nameData}
                  helperText={(!errors.phoneData && !errors.nameData) && "Name is required!" }
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name/Identifier"
                  autoFocus
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, firstName: e.target.value })
                  }
                  value={classes.firstName}
                />
              </Grid>
              <Grid item xs={3} >
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, lastName: e.target.value })
                  }
                  value={classes.lastName}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, age: e.target.value })
                  }
                  value={classes.age}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" display="block" gutterBottom className="genderLabel">
                  Gender &nbsp;
                  </Typography>
                <FormControl>
                  <RadioGroup className="gendergroup" value={classes.gender} onChange={(e) =>
                    setsearchDetails({ ...searchDetails, gender: e.target.value })
                  }>
                    <FormControlLabel
                      control={<Radio />}
                      label="Female"
                      value="f"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Male"
                      value="m"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Other"
                      value="o"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="date"
                  label="Late visited"
                  type="date"
                  defaultValue=""
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setsearchDetails({ ...searchDetails, lvd: e.target.value })
                  }
                />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className='searchbtn'
                size="small"
                onClick={() =>
                  search()}
              >
                Search
                </Button>
            </Grid>
          </form>
          <br></br>
                {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
          )}
          
          
        </div>
      {apihit &&
              <Typography variant="overline" display="block" gutterBottom>
                No Results Found
      </Typography>
      }

      </Container>
    );
  }





}