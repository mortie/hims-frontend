import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { DataGrid } from "@material-ui/data-grid";

import axios from "axios";
import styles from "./styles";
import "./styles.css";

class PatientSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
      isDataPresent: false,
      nameData: false,
      phoneData: false,
      apihit: false,
      classes: makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(10),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: "100%", // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        container: {
          display: "flex",
          flexWrap: "wrap",
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
        root: {
          width: "92%",
          marginLeft: "4%",
        },
        containerTable: {
          maxHeight: 440,
        },
      })),
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      age: 0,
      gender: "F",
      lvd: "",
      columns: [
        { id: "identifier", label: "Patient ID", minWidth: 170 },
        { id: "name", label: "Name", minWidth: 170 },
        {
          id: "phone",
          label: "Phone",
          minWidth: 100,
          align: "left",
        },
        {
          id: "gender",
          label: "Gender",
          minWidth: 80,
          align: "right",
        },
        {
          id: "age",
          label: "Age",
          minWidth: 80,
          align: "right",
        },
        {
          id: "address",
          label: "Address",
          minWidth: 150,
          align: "right",
        },
        {
          id: "lvd",
          label: "Last Visited",
          minWidth: 150,
          align: "right",
        },
        {
          id: "action",
          label: "Action",
          minWidth: 150,
          align: "right",
        },
      ],

      columnsNew: [
        { field: "identifier", headerName: "Patiend ID", width: 150 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "phone", headerName: "Phone", width: 115 },
        {
          field: "gender",
          headerName: "Gender",
          type: "number",
          width: 80,
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          width: 70,
        },
        {
          field: "address",
          headerName: "Address",
          type: "string",
          width: 200,
          height: 300,
        },
        {
          field: "lvd",
          headerName: "Last Visited",
          type: "string",
          width: 120,
        },
        {
          field: "action",
          headerName: "Action",
          type: "string",
          width: 100,
          renderCell: () => (
            <strong>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
              >
                Action
              </Button>
            </strong>
          ),
        },
      ],

      rowsData: [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
      ],
    };
  }

  handleChange(e, id) {
    this.setState({ [id]: e.target.value });
  }

  createData(
    identifier: any,
    name: any,
    phone: any,
    gender: any,
    age: any,
    address: any,
    lvd: any,
    action: any,
    id: any
  ) {
    return { identifier, name, phone, gender, age, address, lvd, action, id };
  }

  search = (key) => {
    const {
      firstName,
      lastName,
      phone,
      age,
      gender,
      lvd,
      searchData,
    } = this.state;
    let isDataAlready = false;
    let alreadystoredata = [];
    if (searchData.length > 0 && this.state.isDataPresent == true) {
      isDataAlready = true;
    }
    if (isDataAlready) {
      for (let k = 0; k < searchData.length; k++) {
        if (phone && searchData[k]["phone"].includes(phone)) {
          alreadystoredata.push(searchData[k]);
          break;
        } else if (
          firstName &&
          searchData[k]["name"].toLowerCase().includes(firstName.toLowerCase())
        ) {
          if (age && searchData[k]["age"].includes(age)) {
            alreadystoredata = [];
            alreadystoredata.push(searchData[k]);
          } else {
            alreadystoredata.push(searchData[k]);
          }
        }
      }
      if (alreadystoredata.length > 0) {
        this.setState({ searchData: alreadystoredata });
        this.setState({ isDataPresent: true });
      } else {
        let param = firstName;
        var username = "admin";
        var password = "Admin123";
        if (firstName) {
          param = firstName;
        }
        if (phone) {
          param = phone;
        }
        if (firstName && phone) {
          param = phone;
        }
        if (firstName || phone) {
          this.setState({ nameData: false });
          this.setState({ phoneData: false });

          const headers = {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          };
          const url = `https://ln3.hispindia.org/openmrs/ws/hisp/rest/patient_search?name=${param}`;
          axios
            .get(url, { headers: headers })
            .then((response) => {
              this.setState({ apihit: true });
              var phone = "";
              var searchdatanew = [];
              var visitdate = "";
              this.setState({ searchData: [] });
              searchdatanew = this.state.searchData;
              var storedata = [];

              for (let i = 0; i < response.data.length; i++) {
                var addressrarr = [];
                searchdatanew.push(response.data);
                let identifierid = searchdatanew[0][i]["identifier"];
                let nameval = searchdatanew[0][i]["name"];
                let genval = searchdatanew[0][i]["gender"];
                let ageval = searchdatanew[0][i]["age"];
                if (searchdatanew[0][i]["address"]) {
                  let addr1 = searchdatanew[0][i]["address"]["Address1"];
                  let addr2 = searchdatanew[0][i]["address"]["Address2"];
                  let district = searchdatanew[0][i]["address"]["City Village"];
                  let country = searchdatanew[0][i]["address"]["Country"];
                  let pincode = searchdatanew[0][i]["address"]["Postal Code"];
                  let statecode =
                    searchdatanew[0][i]["address"]["State Province"];
                  // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                  let addr = district + " - " + statecode;
                  addressrarr.push(addr);
                }
                if (searchdatanew[0][i]["person_attributes"]) {
                  phone =
                    searchdatanew[0][i]["person_attributes"][
                      "Telephone Number"
                    ];
                }
                if (searchdatanew[0][i]["visit_date"] != undefined) {
                  visitdate = searchdatanew[0][i]["visit_date"];
                } else {
                  visitdate = "N-A";
                }
                let id = i;

                storedata.push(
                  this.createData(
                    identifierid,
                    nameval,
                    phone,
                    genval,
                    ageval,
                    addressrarr[0],
                    visitdate,
                    "",
                    id
                  )
                );
              }

              if (storedata.length > 0) {
                this.setState({ searchData: [] });
                this.setState({ searchData: storedata });
                this.setState({ isDataPresent: true });
              } else {
                this.setState({ isDataPresent: false });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          this.setState({ nameData: true });
          this.setState({ phoneData: true });
        }
      }
    } else {
      let param = firstName;
      var username = "admin";
      var password = "Admin123";
      if (firstName) {
        param = firstName;
      }
      if (phone) {
        param = phone;
      }
      if (firstName && phone) {
        param = phone;
      }
      if (firstName || phone) {
        this.setState({ nameData: false });
        this.setState({ phoneData: false });

        const headers = {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        };
        const url = `https://ln3.hispindia.org/openmrs/ws/hisp/rest/patient_search?name=${param}`;
        axios
          .get(url, { headers: headers })
          .then((response) => {
            this.setState({ apihit: true });
            var phone = "";
            var searchdatanew = [];
            var visitdate = "";
            this.setState({ searchData: [] });
            searchdatanew = this.state.searchData;
            var storedata = [];

            for (let i = 0; i < response.data.length; i++) {
              var addressrarr = [];
              searchdatanew.push(response.data);
              let identifierid = searchdatanew[0][i]["identifier"];
              let nameval = searchdatanew[0][i]["name"];
              let genval = searchdatanew[0][i]["gender"];
              let ageval = searchdatanew[0][i]["age"];
              if (searchdatanew[0][i]["address"]) {
                let addr1 = searchdatanew[0][i]["address"]["Address1"];
                let addr2 = searchdatanew[0][i]["address"]["Address2"];
                let district = searchdatanew[0][i]["address"]["City Village"];
                let country = searchdatanew[0][i]["address"]["Country"];
                let pincode = searchdatanew[0][i]["address"]["Postal Code"];
                let statecode =
                  searchdatanew[0][i]["address"]["State Province"];
                // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                let addr = district + " - " + statecode;
                addressrarr.push(addr);
              }
              if (searchdatanew[0][i]["person_attributes"]) {
                phone =
                  searchdatanew[0][i]["person_attributes"]["Telephone Number"];
              }
              if (searchdatanew[0][i]["visit_date"] != undefined) {
                visitdate = searchdatanew[0][i]["visit_date"];
              } else {
                visitdate = "N-A";
              }
              let id = i;

              storedata.push(
                this.createData(
                  identifierid,
                  nameval,
                  phone,
                  genval,
                  ageval,
                  addressrarr[0],
                  visitdate,
                  "",
                  id
                )
              );
            }

            if (storedata.length > 0) {
              this.setState({ searchData: [] });
              this.setState({ searchData: storedata });
              this.setState({ isDataPresent: true });
            } else {
              this.setState({ isDataPresent: false });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.setState({ nameData: true });
        this.setState({ phoneData: true });
      }
    }
  };
  render() {
    const { classes } = this.state;
    const isDataPresent = this.state.isDataPresent;
    const searchdat = this.state.searchData;
    console.log(isDataPresent);
    console.log(this.state.apihit);
    if (isDataPresent) {
      return (
        <React.Fragment>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      error={this.state.phoneData}
                      helperText={this.state.phoneData && "Phone is required!"}
                      variant="outlined"
                      required
                      fullWidth
                      id="phone"
                      label="Phone"
                      name="phone"
                      autoComplete="phone"
                      onChange={(e) => this.handleChange(e, "phone")}
                      value={classes.phone}
                    />
                  </Grid>

                  <Grid item sm={3}>
                    <TextField
                      error={this.state.nameData}
                      helperText={this.state.nameData && "Name is required!"}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name/Identifier"
                      autoFocus
                      onChange={(e) => this.handleChange(e, "firstName")}
                      value={classes.firstName}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={(e) => this.handleChange(e, "lastName")}
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
                      onChange={(e) => this.handleChange(e, "age")}
                      value={classes.age}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" display="block" gutterBottom>
                      Gender &nbsp;
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        value={classes.gender}
                        onChange={(e) => this.handleChange(e, "gender")}
                      >
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
                      onChange={(e) => this.handleChange(e, "lvd")}
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    className="searchbtn"
                    size="small"
                    onClick={() => this.search()}
                  >
                    Search
                  </Button>
                </Grid>
              </form>
            </div>
          </Container>
          <br></br>

          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rowHeight={50}
              wrap="wrap"
              rows={searchdat}
              columns={this.state.columnsNew}
              pageSize={5}
            />
          </div>

          {/* <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {this.state.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
              <TableBody>
                { this.state.searchData ?                  
                  this.state.searchData.map((row) => {   
                    return(
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.identifier}>
                        {this.state.columns.map((column) => {
                          const value = row[column.id];
                              return(
                          <TableCell key={column.id} align={column.align}>
                            {value}
                            </TableCell>
                              )                          
                        })}
                          </TableRow>
                      
                    
                  )
                    })
                  
                  : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
       */}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      error={this.state.phoneData}
                      helperText={this.state.phoneData && "Phone is required!"}
                      variant="outlined"
                      required
                      fullWidth
                      id="phone"
                      label="Phone"
                      name="phone"
                      autoComplete="phone"
                      onChange={(e) => this.handleChange(e, "phone")}
                      value={classes.phone}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <TextField
                      error={this.state.nameData}
                      helperText={this.state.nameData && "Name is required!"}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name/Identifier"
                      autoFocus
                      onChange={(e) => this.handleChange(e, "firstName")}
                      value={classes.firstName}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={(e) => this.handleChange(e, "lastName")}
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
                      onChange={(e) => this.handleChange(e, "age")}
                      value={classes.age}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" display="block" gutterBottom>
                      Gender &nbsp;
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        value={classes.gender}
                        onChange={(e) => this.handleChange(e, "gender")}
                      >
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
                      onChange={(e) => this.handleChange(e, "lvd")}
                    />
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    className="searchbtn"
                    size="small"
                    onClick={() => this.search()}
                  >
                    Search
                  </Button>
                </Grid>
              </form>
            </div>
          </Container>
          <br></br>
          {this.state.apihit && (
            <Typography variant="overline" display="block" gutterBottom>
              No Results Found
            </Typography>
          )}
        </React.Fragment>
      );
    }
  }
}

export default PatientSearch;
