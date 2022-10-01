import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      //create new user in backend
      await axios.post(`/api/auth/signup`, {
        name,
        email,
        password,
      });
      //Login user using signin function
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4 pt-14">
          <div className="card p-5">
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">Register</h1>
              <div className="mb-4">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full"
                  placeholder="Enter your full name here"
                  autoFocus
                  {...register('name', {
                    required: '*Please enter your full name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email here"
                  {...register('email', {
                    required: '*Please enter your email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                  className="w-full"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password here"
                  className="w-full"
                  {...register('password', {
                    required: '*Please enter your password',
                    minLength: {
                      value: 6,
                      message: 'Password must have at least 6 characters',
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password here"
                  className="w-full"
                  {...register('confirmPassword', {
                    required: '*Please confirm your Password',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'Password must have at least 6 characters',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="text-red-500">Password do not match</div>
                  )}
              </div>
              <div className="mb-4">
                <button className="primary-button">Register</button>
              </div>
              <div className="mb-4">
                Already have an account?&nbsp;
                <button className="register-button text-base">
                  <Link href={`/login?redirect=${redirect || '/'}`}>Login</Link>
                </button>
                &nbsp;here.
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
