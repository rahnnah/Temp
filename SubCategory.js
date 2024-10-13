import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubCategory.css'; // CSS for styling the page
import Footer from '../components/Footer'; // Footer component for the page

const SubCategory = () => {
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryDesc, setSubcategoryDesc] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [subcategoryStatus, setSubcategoryStatus] = useState('T'); // Default active status
  const [token, setToken] = useState(''); // Store the bearer token

  const navigate = useNavigate();

  // Fetch categories to select CATEGORYID
  useEffect(() => {
    fetch('http://storezan.com/webapi/STORE/category', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.category);
      })
      .catch((error) => console.error('Error fetching category data:', error));
  }, []);

  // Handle subcategory form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `https://www.storezan.com/webapi/STORE/savesubcategory?SUBCATEGORYNAME=${subcategoryName}&SUBCATEGORYDESC=${subcategoryDesc}&CATEGORYID=${categoryID}&SUBCATEGORYSTATUS=${subcategoryStatus}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`, // Use the token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.status[0].stat === 'T') {
          alert('Subcategory added successfully!');
        } else {
          alert('Failed to add subcategory.');
        }
      })
      .catch((error) => console.error('Error saving subcategory:', error));
  };

  return (
    <div className="subcategory-page">
      <div className="breadcrumb">Dashboard / Subcategory</div>

      <div className="small-heading">
        <h4>Add Subcategory</h4>
      </div>

      <form onSubmit={handleSubmit} className="subcategory-form">
        <div className="form-group">
          <label htmlFor="subcategoryName">Subcategory Name:</label>
          <input
            type="text"
            id="subcategoryName"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subcategoryDesc">Description:</label>
          <input
            type="text"
            id="subcategoryDesc"
            value={subcategoryDesc}
            onChange={(e) => setSubcategoryDesc(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryID">Select Category:</label>
          <select
            id="categoryID"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category.CATID} value={category.CATID}>
                {category.CATNAME}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subcategoryStatus">Status:</label>
          <select
            id="subcategoryStatus"
            value={subcategoryStatus}
            onChange={(e) => setSubcategoryStatus(e.target.value)}
            required
          >
            <option value="T">Active</option>
            <option value="F">Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="token">Bearer Token:</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter bearer token"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Subcategory
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default SubCategory;
