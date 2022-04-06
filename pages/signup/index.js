import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import insta from "../../assets/insta.svg";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage,db } from "../../firebase";

import { doc, setDoc } from "firebase/firestore";

function Index() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { signup, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");
      const user = await signup(email, password);
      console.log("Signed up");
      const storageRef = ref(storage, `${user.uid}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              let obj = {
                name: name,
                email: email,
                uid: user.user.uid,
                photoURL: downloadURL,
              };
              await setDoc(doc(db, "users", user.user.uid), obj);
              console.log("docment added");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    } catch (err) {
      console.log(err);
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
      console.log("Not Logged in");
    }
  }, [user]);

  return (
    <div className="signup-container">
      <div className="signup-card">
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
        <TextField
          size="small"
          margin="dense"
          id="outlined-basic"
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          size="small"
          margin="dense"
          id="outlined-basic"
          fullWidth
          label="Full Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="outlined"
          fullWidth
          component="label"
          style={{ marginTop: "1rem" }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none", marginRight: "1rem" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          Upload
        </Button>
        <Button
          variant="contained"
          fullWidth
          component="span"
          style={{ marginTop: "1rem" }}
          disabled={loading}
          onClick={handleClick}
        >
          Signup
        </Button>
      </div>
      <div className="bottom-card">
        Already Have an Account
        <Link href="/login">
          <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Index;
