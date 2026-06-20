
function Login() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <p>Please enter your credentials to log in.</p>
      <input type="text" placeholder="Username" className="mt-2 p-2 rounded bg-gray-700 text-white w-full" />
      <input type="password" placeholder="Password" className="mt-2 p-2 rounded bg-gray-700 text-white w-full" />
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Login</button>
    </div>
  );
}

export default Login;