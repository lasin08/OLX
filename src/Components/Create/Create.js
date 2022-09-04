import React, {useState, Fragment,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, Authcontext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

const Create = () => {
 const history =useHistory()
 const [name, setName] = useState('')
 const [category, setCategory] = useState('')
 const [price, setPrice] = useState('')
 const [image, setImage] = useState(null)
 const {Firebase} =useContext(FirebaseContext)
 const {user} =useContext(Authcontext)
 const date= new Date();
 const handleClick = ()=>{
Firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
  ref.getDownloadURL().then((url)=>{
    console.log(url);
    Firebase.firestore().collection('products').add({
      name,
      category,
      price,
      url,
      userId:user.uid,
      createAt:date.toDateString()
    })
  })
})
history.push('/');
 }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              onChange={(e)=>{setName(e.target.value)}}
              value={name}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              onChange={(e)=>{setCategory(e.target.value)}}
              value={category}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  
            onChange={(e)=>{setPrice(e.target.value)}}
            value={price}
             />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handleClick} className="uploadBtn">Upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
