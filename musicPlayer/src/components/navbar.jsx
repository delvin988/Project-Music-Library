import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Navbar() {
    const navigate = useNavigate()
    function doLogout(){
        localStorage.clear()
        navigate("/login")
    }

    const handleOnUpgrade = async () => {
        const{data} = await axios.get('http://localhost:3000/payment/midtrans/initiate', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
        window.snap.pay(data.transactionToken, {
            onSuccess: async function (result) {
                alert("payment success!")
                console.log(result);
                await axios.patch('http://localhost:3000/users/me/upgrade', {
                    orderId: data.orderId,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                })
            }
        });
    } 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to={'/home'}>
                    <img src="https://res.cloudinary.com/demuvtnro/image/upload/v1707986816/wuqd7ni33xcrytz27zqx.png" alt="Your Logo" style={{ width: "80px" }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/home'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger mx-2" onClick={doLogout}>Log Out</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger mx-2" onClick={() => navigate('/favourite')}>Favourite</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleOnUpgrade} className="btn btn-danger mx-2">Upgrade</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  );
}

export default Navbar;
