import { Button } from "@mui/material"
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "./GoogleIcon";

export default function GoogleLogIn() {
    return (
        <GoogleLogin
        clientId=""
        render={(renderProps) => (
          <Button
            color="primary"
            fullWidth
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<GoogleIcon />}
            variant="contained"
          >
            Google Sign In
          </Button>
        )}
        cookiePolicy="single_host_origin"
      />
    )
}
