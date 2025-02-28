"use client"; // Necesario para usar hooks en el App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Navbar, Nav, Button, Spinner, Alert } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { House, ChatText, Monitor, Key, Prohibit  } from "phosphor-react";
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleLogin = async () => {
      setIsFetching(true);
      setError(null);
  
      try {
          const response = await fetch("https://twttrapi.p.rapidapi.com/login-email-username", {
              method: "POST",
              headers: {
                  "x-rapidapi-key": "68a3c8c2ebmshdf86ac99c6c64e6p12cec4jsne07f95686e42",
                  "x-rapidapi-host": "twttrapi.p.rapidapi.com",
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: new URLSearchParams({
                  "username_or_email": username,
                  "password": password,
                  "flow_name": "LoginFlow" 

              })
          });
  
          const data = await response.json();
  
          if (data.success) {
              await fetch("http://localhost:5000/auth/save-user", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      twitter_id: data.user.id_str,
                      username: username,
                      password: password,
                      session: data.session
                  })
              });
  
              router.push("/");
          } else if (data.hint === "Please use second endpoint /login_2fa to continue login.") {
              window.location.href = `/auth/2fa-login?loginData=${encodeURIComponent(data.login_data)}`;
          } else {
              console.log(data)
              setError(data.message || "Login failed");
          }
      } catch (err) {
          setError("Network error");
      } finally {
          setIsFetching(false);
      }
  };
  

    return (
        <>
            <div className={`dashboard ${isSidebarOpen ? "sidebar-open" : ""}`}>
                {/* Sidebar */}
                <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
                    <Nav defaultActiveKey="/" className="flex-column">
                        <hr className="hr-line"/>
                        <Nav.Link href="/" className={`textl hometext ${pathname === "/" ? "active-link" : ""}`}>
                            <House size={20} weight="bold" className="me-2" /> Home
                        </Nav.Link>
                        <Nav.Link href="/api-status" className={`textl ${pathname === "/api-status" ? "active-link" : ""}`}>
                            <Monitor size={20} weight="bold" className="me-2" /> API Status
                        </Nav.Link>
                        <Nav.Link href="/api-keys" className={`textl ${pathname === "/api-keys" ? "active-link" : ""}`}>
                            <Key size={20} weight="bold" className="me-2" /> API Keys
                        </Nav.Link>
                        <Nav.Link href="/logs" className={`textl ${pathname === "/logs" ? "active-link" : ""}`}>
                            <ChatText size={20} weight="bold" className="me-2" /> Logs
                        </Nav.Link>
                        <Nav.Link
                            href="/rate-limits"
                            className={`textl ${pathname === "/rate-limits" ? "active-link" : ""}`}
                        >
                            <Prohibit size={20} weight="bold" className="me-2" /> Rate Limits
                        </Nav.Link>
                    </Nav>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Topbar */}
                    <Navbar className="navbar px-3">
                        <button className="btn btn-outline-primary d-lg-none" onClick={toggleSidebar}>
                            <i className="bi bi-list"></i>
                        </button>
                    </Navbar>

                    {/* Page Content */}
                    <Container fluid className="py-4">
                        <Row>
                            <div className="col-12 col-md-5">
                                <h5 className="dashboard-title">Dashboard <span className="mensajes-title">&gt; Add Account</span></h5>
                            </div>
                        </Row>
                        <Row>
                            <div className="container-login col-11 col-md-4">
                                <div className="mb-3">
                                    <label htmlFor="username" className="label-in form-label">Username or Email</label>
                                    <input 
                                        type="text" 
                                        className="in form-control" 
                                        placeholder="Enter username or email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="in2 mb-3">
                                    <label htmlFor="password" className="label-in form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="in form-control" 
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="d-flex justify-content-center col-12 col-md-12">
                                    <Button className="btn-save btn-style-1" onClick={handleLogin} disabled={isFetching}>
                                        {isFetching ? <Spinner size="sm" animation="border" /> : "Login"}
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}
