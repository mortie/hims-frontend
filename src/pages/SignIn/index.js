import React, { useState } from "react";
import { getAPI } from "../../services";
import { login, encrypt, decrypt, getRandomNumber } from "../../utils";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  makeStyles,
  Grid,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import Footer from "../../components/Footer";
import styles from "./styles";

const useStyles = makeStyles(styles);

export default function SignIn(props) {
  let { location, history } = props;
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errors, setErrors] = useState({ usr: true, pwd: true });

  // useEffect(() => {
  //   if (localStorage.getItem("rememberMe") && localStorage.getItem("username") !== "" && localStorage.getItem("password") !==) {
      
  //   }
  // }, []);

  const submitForm = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      getAPI(
        "/session",
        decrypt(
          encrypt(
            `${loginDetails.username}:${loginDetails.password}`,
            getRandomNumber(0, 9)
          )
        )
      )
        .then((response) => {
          setLoading(false);
          if (response.data.authenticated) {
            login(
              response.data.user,
              response.config.headers.Authorization,
              history,
              location.state?.from
            );
          } else {
            setLoginError(true);
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  };

  const validateForm = () => {
    setErrors({
      usr: !loginDetails.username ? false : true,
      pwd: !loginDetails.password ? false : true,
    });

    if (!loginDetails.username || !loginDetails.password) {
      return false;
    }

    return true;
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => submitForm(e)}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={!errors.usr}
              helperText={!errors.usr && "Username is required!"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={loginDetails.username}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, username: e.target.value })
              }
            />
            <TextField
              error={!errors.pwd}
              helperText={!errors.pwd && "Password is required!"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              checked={loginDetails.remember}
              label="Remember me"
            />
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                Sign In
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>

            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </form>
        </div>

        {loginError && (
          <Alert severity="error">
            <strong>Invalid Username or Password</strong> — Please try again.
          </Alert>
        )}

        <Footer />
      </Grid>
    </Grid>
  );
}
