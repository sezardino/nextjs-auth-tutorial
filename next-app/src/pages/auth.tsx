import { FormEvent, useState } from "react";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-10">
        <h1 className="text-center text-xl">Auth</h1>
        <form
          className="grid grid-cols-1 gap-5 w-full max-w-3xl mx-auto"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(evt) => setUsername(evt.currentTarget.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
          <button className="px-4 py-2 border border-gray-300 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
