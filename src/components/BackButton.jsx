import { Link } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs';

const BackButton = () => {
    return (
      <div className='flex'>
        <Link to={'/'} className='text-white bg-sky-600 px-4 py-1 rounded-lg w-fit'>
            <BsArrowLeftCircle className='text-2xl'></BsArrowLeftCircle>
        </Link>
      </div>
    )
  }
  
export default BackButton