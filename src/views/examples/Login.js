import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../../Utils/Common";
import { RootOnline } from "../../service/Config";
// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  // Row,
  Col,
  // Alert,
} from "reactstrap";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post(RootOnline + "/login", {
        email: username.value,
        password: password.value,
      }).then((response) => {
        setLoading(false);
        setUserSession(response.data.success.token, response.data.success.data);
        // console.log(response.data.success.data.role)
        let session = response.data.success.data.role;
        if (session === "admin") {
          props.history.push("/admin/index");
        } else if (session === "dqmart") {
          props.history.push("/dqmart/index");
        } else if (session === "keuangan") {
          props.history.push("/keuangan/index");
        } else if (session === "unit") {
          props.history.push("/unit/index");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 200)
          setError(error.response.data.message);
        else setError("Username Atau Password Tidak Sesuai");
      });
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-black mb-1">
              <img
                alt="..."
                width="250"
                src={require("../../assets/img/brand/argon-react.png").default}
              />
            </div>
            {error && (
              <>
              <div className="text-center">
                <small style={{ color: "red" }}>{error}</small>
              </div>
                {/* <Alert className="text-center" color="danger">{error}</Alert> */}
              </>
            )}
            <br />
            <Form role="form" onSubmit={onFormSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...username}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...password}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-1"
                  color="info"
                  type="submit"
                  value={loading ? "Loading..." : "Login"}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
