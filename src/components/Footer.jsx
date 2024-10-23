import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='mb-10'>
          <Link to="/login" className="btn btn-outline-primary mr-2">Login</Link>
          <Link to="/register" className="btn btn-outline-success">Register</Link>
    </div>
  )
}

export default Footer