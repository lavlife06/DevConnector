import { Link } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
    getCurrentProfile,
    deleteAccount,
} from "../../reduxstuff/actions/profile";
import Experience from "./Experience";

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>
                    <div className="dash-buttons">
                        <Link to="/edit-profile" className="btn btn-light">
                            <i className="fas fa-user-circle text-primary" />{" "}
                            Edit Profile
                        </Link>
                        <Link to="/add-experience" className="btn btn-light">
                            <i className="fab fa-black-tie text-primary" /> Add
                            Experience
                        </Link>
                    </div>
                    <Experience experience={profile.experience} />
                    {/* <Education education={profile.education} /> */}
                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => deleteAccount()}
                        >
                            <i className="fas fa-user-minus" /> Delete My
                            Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getCurrentProfile,
    deleteAccount,
})(Dashboard);
