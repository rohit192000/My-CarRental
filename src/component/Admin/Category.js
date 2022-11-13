import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Grid, Typography, Button, CardContent, TextField, Container, Card, TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';
import { db } from '../../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import imgbackground from '../image/nee.jpg';
const Category = () => {
  const [category, setCategory] = useState([]);
  const getCategory = () => {
    db.collection("category").onSnapshot((querySnapshot) => {
      const item = [];
      querySnapshot.forEach((doc) => {
        item.push(doc);
      })
      setCategory(item);
    })
  }
  useEffect(() => {
    getCategory();
  }, []);
  const addCategory = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    let catname = data.get('catname');
    if (catname === '') {
      alert('please fill category')
    } else {
      db.collection('category').add({
        Name: catname,
        Quantity:0,
      }).then(function (success) {
        alert('Data is added successfully');
        e.target.reset();
      }).catch(function (error) {
        alert('There is a error');
      })
    }
  }
  const deleteCategory = (x) => {
    db.collection('category').doc(x).delete();
  }
  return (
    <>
      <AdminNavbar />
      <img style={{ height: '99vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', filter: 'blur(10px)', position: 'fixed', zIndex: '-1' }} src={imgbackground} alt="" />
      <Grid style={{ background: 'rgb(1,1,1,.7)', minHeight: '100vh', width: '100%', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', position: 'fixed', top: 0, zIndex: '-1' }}>
      </Grid>
      <Container>
        <Grid container>
          <Grid xs={1}></Grid>
          <Grid xs={4}>
            <CardContent>
              <Card>
                <form className="form-group" onSubmit={addCategory}>
                  <CardContent>
                    <Typography variant='body1'>Add Category</Typography>
                    <br />
                    <TextField size='small' name="catname" variant='outlined' className="form-control" label="Enter car category" type="text" fullWidth></TextField>
                  </CardContent>
                  <CardContent>
                    <Button type="submit" variant='contained' color='primary'>Add</Button>
                  </CardContent>
                </form>
              </Card>
            </CardContent>
          </Grid>
          <Grid xs={2}></Grid>
          <Grid xs={4}>
            <CardContent>
              <TableContainer>
                <Table style={{ backgroundColor: 'white' }}>
                  <TableHead style={{ backgroundColor: 'rgb(36, 86, 166)', color: 'white' }}>
                    <TableRow >
                      <TableCell align='center' style={{ color: 'white' }}><b>Cat Name</b></TableCell>
                      <TableCell align='center' style={{ color: 'white' }}><b>Action</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      category.map((categorydata) => (
                        <TableRow key={categorydata.id}>
                          <TableCell align='center'>{categorydata.data().Name}</TableCell>
                          <TableCell align='center'><Button variant='contained' color='primary' onClick={() => deleteCategory(categorydata.id)}>< DeleteIcon /></Button></TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Category;
