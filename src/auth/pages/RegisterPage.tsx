import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router"
import classNames from 'classnames';
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { Toast } from "../../helpers";


type Inputs = { name: string, email: string, password: string, cpassword: string }


export const RegisterPage = () => {

    const { startRegister, errorMessage } = useAuthStore()

    const { register, handleSubmit, getValues, formState: { errors, dirtyFields, touchedFields } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { cpassword, ...rest } = data;
        startRegister(rest);
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

                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="mb-5">
                                        <h3 className="h4 font-weight-bold text-theme">Register</h3>
                                    </div>

                                    <h6 className="h5 mb-0">Welcome Calendar APP!</h6>
                                    <p className="text-muted mt-2 mb-5">
                                        Gestione su tiempo de manera eficiente
                                    </p>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                {...register("name", { required: "Name is required" })}
                                                className={classNames('form-control', { "is-invalid": errors.name && touchedFields.name })}
                                            />
                                            {
                                                (errors.name && (dirtyFields.name || touchedFields.name)) &&
                                                <div className="invalid-feedback">
                                                    {errors.name?.message}
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address",
                                                    }
                                                })}
                                                type="text"
                                                className={classNames('form-control', { "is-invalid": errors.email && touchedFields.email })}
                                            />
                                            {
                                                (errors.email && (dirtyFields.email || touchedFields.email)) &&
                                                <div className="invalid-feedback">
                                                    {errors.email?.message}
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters"
                                                    }
                                                })}
                                                className={classNames('form-control', { "is-invalid": errors.password && touchedFields.password })}
                                            />
                                            {
                                                (errors.password && (dirtyFields.password || touchedFields.password)) &&
                                                <div className="invalid-feedback">
                                                    {errors.password?.message}
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>Repeat password</label>
                                            <input
                                                type="password"
                                                {...register("cpassword", {
                                                    required: "Repeat password is required",
                                                    validate: (value) => {
                                                        const { password } = getValues();
                                                        return password === value || "Passwords should match!";
                                                    }
                                                })}
                                                className={classNames('form-control', { "is-invalid": errors.cpassword && touchedFields.password })}
                                            />
                                            {
                                                (errors.cpassword && (dirtyFields.cpassword || touchedFields.cpassword)) &&
                                                <div className="invalid-feedback">
                                                    {errors.cpassword?.message}
                                                </div>
                                            }
                                        </div>
                                        <button type="submit" className="btn btn-theme">Register</button>

                                    </form>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>


                <p className="text-center mt-3">
                    Do have an account?
                    <Link to={'/auth/login'} className="text-primary ml-1">Login</Link>
                </p>

            </div>
        </>
    )
}
