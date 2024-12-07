import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import classNames from 'classnames';

import { Toast } from "../../helpers";
import { useAuthStore } from "../../hooks"




type Inputs = { email: string, password: string }


export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore()

    const { register, handleSubmit, formState: { errors, dirtyFields, touchedFields } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        startLogin(data);
    }

    useEffect(() => {
        if (!!errorMessage)
            Toast.fire({ icon: "error", title: errorMessage });
    }, [errorMessage])

    return (
        <>
            <div className="col-xl-8">
                <div className="card border-1">
                    <div className="card-body p-10">
                        <div className="row no-gutters">

                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="mb-5">
                                        <h3 className="h4 font-weight-bold text-theme">Access</h3>
                                    </div>

                                    <h6 className="h5 mb-0">Welcome Calendar APP!</h6>
                                    <p className="text-muted mt-2 mb-5">
                                        Gestione su tiempo de manera eficiente
                                    </p>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input
                                                type="email"
                                                className={classNames('form-control', { "is-invalid": errors.email && touchedFields.email })}
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address",
                                                    }
                                                })}
                                            />
                                            {
                                                (errors.email && (dirtyFields.email || touchedFields.email)) &&
                                                <div className="invalid-feedback">
                                                    {errors.email?.message}
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                className={classNames('form-control', { "is-invalid": errors.password && touchedFields.password })}
                                                {...register("password", {
                                                    required: "You must specify a password",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters"
                                                    }
                                                })}
                                            />
                                            {
                                                (errors.password && (dirtyFields.password || touchedFields.password)) &&
                                                <div className="invalid-feedback">
                                                    {errors.password?.message}
                                                </div>
                                            }
                                        </div>
                                        <button type="submit" className="btn btn-theme">Login</button>

                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-6 d-none d-lg-inline-block">
                                <div className="account-block rounded-right">
                                    <div className="overlay rounded-right"></div>
                                    <div className="account-testimonial">
                                        <h4 className="text-white mb-4">Su informacion segura!</h4>
                                        <p className="lead text-white">"Gestione de manera rapida e idonea la forma como organiza su tiempo"</p>
                                        <p>--- Shamir Torres ---</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


                <p className="text-center mt-3">
                    Don't have an account?
                    <Link to={'/auth/register'} className="text-primary ml-1">register</Link>
                </p>

            </div>

        </>
    )
}
