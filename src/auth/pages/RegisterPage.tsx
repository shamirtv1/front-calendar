import { Link } from "react-router-dom"

export const RegisterPage = () => {
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

                                    <form>
                                    <div className="form-group">
                                            <label>FullName</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" />
                                        </div>
                                        <div className="form-group mb-5">
                                            <label>Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" />
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
