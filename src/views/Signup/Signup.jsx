import { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import {
  getUserByHandle,
  createUserHandle,
} from '../../services/users.service';
import { registerUser } from '../../services/auth.service';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Signup() {
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  });

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {'Copyright © '}
        <Link
          color="inherit"
          href="https://gitlab.com/daniil.nazarov/forum-project"
        >
          The Front
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const onRegister = () => {
    if (!form.email) {
      return alert('Email is required');
    }

    if (!form.password || form.password.length < 6) {
      return alert('Password is required and must be at least 6 characters');
    }

    if (!form.username) {
      return alert('username is required');
    }
    // TODO: validate the form before submitting request
    // check if an user with the handle exists
    getUserByHandle(form.username)
      .then((snapshot) => {
        if (snapshot.exists()) {
          throw new Error(`Username @${form.username} has already been taken!`);
        }

        return registerUser(form.email, form.password);
      })
      .then((credential) => {
        // the handle is unique, so create a user record in the database with the handle, user id, data of creation, email and a map to liked Posts (an empty object initially)
        return createUserHandle(
          form.username,
          credential.user.uid,
          form.email,
          form.firstName,
          form.lastName
        ).then(() => {
          setAuthState({
            user: credential.user,
          });
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => console.log(e));
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  value={form.firstName}
                  onChange={updateForm('firstName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={form.lastName}
                  onChange={updateForm('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  value={form.username}
                  onChange={updateForm('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={updateForm('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={updateForm('password')}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onRegister}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
