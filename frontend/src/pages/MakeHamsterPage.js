import React, { useState } from 'react';
import FormData from 'form-data';
import './MakeHamsterPage.css';

const MakeHamsterPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [favFood, setFavFood] = useState('');
  const [loves, setLoves] = useState('');
  const [imgName, setImgName] = useState('');
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('imageFile', e.target.imageFile.files[0]);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('favFood', favFood);
    formData.append('loves', loves);
    formData.append('alt', alt);

    try {
      const response = await fetch('http://localhost:4000/hamsters', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        console.log('Successfully created new hamster');
      } else {
        console.error('Error creating new hamster');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containerMakeHamster">
      <div className="hamster-wrapper">
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <br />
          <label>
            Favorite food:
            <input type="text" value={favFood} onChange={(e) => setFavFood(e.target.value)} />
          </label>
          <br />
          <label>
            Loves:
            <input type="text" value={loves} onChange={(e) => setLoves(e.target.value)} />
          </label>
          <br />
          <label>
            Image src:
            <input type="file" name="imageFile" />
          </label>
          <br />
          <button type="submit">Create hamster</button>
        </form>
      </div>
    </div>
  );
};

export default MakeHamsterPage;
