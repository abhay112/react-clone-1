import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import insta from "../../assets/insta.svg";
import Button from "@mui/material/Button";
import bg1 from "../../assets/bg1.png";
import bg3 from "../../assets/bg3.png";
import bg2 from "../../assets/bg2.png";
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "../../context/auth";
import { useRouter, Router } from "next/router";

function Index() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { forgot, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      await forgot(email);
      console.log("Email sent");
      router.push("/login");
    } catch (err) {
      console.log("error");
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("not logginn");
    }
  }, [user]);

  return (
    <div className="login-container">
      <div className="carbg">
        <div className="car">
          <Carousel
            showIndicators={false}
            showArrows={false}
            infiniteLoop={true}
            interval={2000}
            autoPlay={true}
          >
            <Image src={bg1}></Image>
            <Image src={bg2}></Image>
            <Image src={bg3}></Image>
          </Carousel>
        </div>
      </div>
      <div>
        <div className="login-card">
          <Image src={insta} />
          <TextField
            size="small"
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <TextField
            size="small"
            margin="dense"
            id="outlined-basic"
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}

          {error != "" && <div style={{ color: "red" }}>{error}</div>}

          <Button
            variant="contained"
            fullWidth
            component="span"
            style={{ marginTop: "1rem" }}
            onClick={handleClick}
            disabled={loading}
          >
            Send Email
          </Button>
          <div style={{ color: "red", marginTop: "0.5rem" }}>
            Forget Password ?
          </div>
        </div>
        <div className="bottom-card">
          Dont&apos;t Have an Account
          <span style={{ color: "blue" }}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Index;
