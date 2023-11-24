import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 // const [isRegister, setRegister] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleRegister = () => {
    const data = {
      email,
      password,
    };
    axios
    .post("http://localhost:5555/register/", data)
    .then((res) => {
      toast.success(res.data.message, {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl">Register</h1>
        <form>
        <div className="flex flex-col border-2 border-sky-700 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Mail</label>
            <input type="email" {...register('email', {required : true})} value={email} onChange={(e) => setEmail(e.target.value)} className={`border-2 px-4 py-2 w-full ${errors.email ? 'border-red-300' : 'border-gray-300'}`}  aria-invalid={errors.email ? "true" : "false"} ></input>
            {errors.email?.type === 'required' && <p role="alert" className="text-red-300">Mail is required</p>}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Password</label>
            <input type="password" {...register('password', {required : true})} value={password} onChange={(e) => setPassword(e.target.value)} className={`border-2 px-4 py-2 w-full ${errors.password ? 'border-red-300' : 'border-gray-300'}`}  aria-invalid={errors.password ? "true" : "false"} ></input>
            {errors.password?.type === 'required' && <p className="text-red-300" role="alert">Password is required</p>}
          </div>
          <button onClick={handleSubmit(handleRegister)} className="p-2 m-8 bg-blue-100">Register</button>
          <Link to='/login' className="p-2 m-8 bg-blue-100">Already have an account ? Login</Link>
        </div>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Register;
