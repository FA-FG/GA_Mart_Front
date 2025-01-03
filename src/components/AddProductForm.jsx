import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ProductServer from '../services/ProductServer';

const AddProductForm = ({user}) => {
  const initialState = {
    name: '',
    quantity: '',
    unit: '',
    price: '',
    image: '',
    description: ''
  };
  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
      try {
        // Sending data to backend for  registration
        const response = await axios.post('http://localhost:5000/products/create', {
          name: formState.name, 
          quantity: formState.quantity,
          unit: formState.unit,
          price: formState.price,
          image: formState.image,
          description: formState.description
        });
        if (response.status === 200) {
          setError('Account created successfully!');
          setIsValid(true);

          navigate('/login');  
        }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setFormState(initialState);
    setError('');
  };
  return user ? (
    <div className="form">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Product Name"
            id="name"
            value={formState.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="name">Product Name</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Quantity"
            id="quantity"
            value={formState.quantity}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Unit"
            id="unit"
            value={formState.unit}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="unit">Unit</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Price"
            id="price"
            value={formState.price}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="price">Price</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Image URL"
            id="image"
            value={formState.image}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="image">Image URL</label>
        </div>
        <div className="input-group">
          <textarea
            placeholder="Description"
            id="description"
            value={formState.description}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="description">Description</label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding Product...' : 'Add Product'}
        </button>
        <button type="button" className="cancel" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  ):<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
}
export default AddProductForm;