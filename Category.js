import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css'; // Include CSS for styling
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for edit and delete
import Footer from '../components/Footer'; // Footer Component

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch the category data from the API
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

  const handleAddCategory = () => {
    navigate('/add-category');
  };

  const handleEditCategory = (id) => {
    navigate(`/edit-category/${id}`);
  };

  const filteredCategories = categories.filter((category) =>
    category.CATNAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-page">
      <div className="breadcrumb">Dashboard / Categories</div>

      <div className="small-heading">
        <h4>Categories</h4>
      </div>

      <div className="category-table-container">
        <div className="category-table-header">
          <input
            type="text"
            placeholder="Search in categories"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="controls">
            <button className="add-category-btn" onClick={handleAddCategory}>
              + Add Category
            </button>
          </div>
        </div>

        <table className="category-table">
          <thead>
            <tr>
              <th></th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.CATID}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{category.CATNAME}</td>
                <td>{category.CDESCRIPTION}</td>
                <td>{category.CATSTATUS}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditCategory(category.CATID)}>
                    <FaEdit />
                  </button>
                  <button className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default Category;
