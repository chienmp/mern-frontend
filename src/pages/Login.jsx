import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleLogin = () => {
    const data = {
      email,
      password,
    };
    axios
    .post("http://localhost:5555/login/", data)
    .then((result) => {
      cookies.set("TOKEN", result.data.token, {
        path: "/",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    })
    .catch((error) => {
      const err = error.response ? error.response.data : 'something wrong';
      toast.error(err, {
        position: "bottom-left",
      });
      console.log(error);
    });
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl">Login</h1>
        <form>
        <div className="flex flex-col border-2 border-sky-700 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Mail</label>
            <input type="email" {...register('email', {required : true})} value={email} onChange={(e) => setEmail(e.target.value)} className={`border-2 px-4 py-2 w-full ${errors.email ? 'border-red-300' : 'border-gray-300'}`}  aria-invalid={errors.email ? "true" : "false"} ></input>
            {errors.email?.type === 'required' && <p role="alert" className="text-red-300">Mail is required</p>}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input type="password" {...register('password', {required : true})} value={password} onChange={(e) => setPassword(e.target.value)} className={`border-2 px-4 py-2 w-full ${errors.password ? 'border-red-300' : 'border-gray-300'}`}  aria-invalid={errors.password ? "true" : "false"} ></input>
            {errors.password?.type === 'required' && <p className="text-red-300" role="alert">Password is required</p>}
          </div>
          <button onClick={handleSubmit(handleLogin)} className="p-2 m-8 bg-blue-100">Login</button>
        </div>
        </form>
        <ToastContainer />
    </div>
    
  )
}

export default Login;
