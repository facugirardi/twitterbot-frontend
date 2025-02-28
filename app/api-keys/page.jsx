"use client"; // Necesario para usar hooks en el App Router

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col, Modal, Nav, Navbar, Spinner, Alert, Button  } from "react-bootstrap";
import { usePathname } from "next/navigation"; // Importar usePathname
import { House, ChatText, Prohibit , Trash, Monitor, Key } from "phosphor-react";
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true); // Estado para el loader
    const pathname = usePathname(); // Obtener la URL actual
    const [isFetching, setIsFetching] = useState(false);  // Estado para saber si el proceso está activo
    const [error, setError] = useState(false); // Estado para manejar errores

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);



    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
      };

    if (loading) {
        // Mostrar el loader mientras el estado `loading` sea true
        return (
          <div className="loader-container">
            <Spinner animation="border" role="status" className="loader">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        );
      }
    
    return (
        <>
        <div className={`dashboard ${isSidebarOpen ? "sidebar-open" : ""}`}>
          {/* Sidebar */}
          <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
            <Nav defaultActiveKey="/" className="flex-column">
            <hr className="hr-line"/>
              <Nav.Link
                href="/"
                className={`textl hometext ${pathname === "/" ? "active-link" : ""}`}
              >
                <House size={20} weight="bold" className="me-2" /> Home
              </Nav.Link>
              <Nav.Link
                href="/api-status"
                className={`textl ${pathname === "/api-status" ? "active-link" : ""}`}
              >
                <Monitor  size={20} weight="bold" className="me-2" /> API Status
              </Nav.Link>
              <Nav.Link
                href="/api-keys"
                className={`textl ${pathname === "/api-keys" ? "active-link" : ""}`}
              >
                <Key  size={20} weight="bold" className="me-2" /> API Keys
              </Nav.Link>
              <Nav.Link
                href="/logs"
                className={`textl ${pathname === "/logs" ? "active-link" : ""}`}
              >
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
              <button
                className="btn btn-outline-primary d-lg-none"
                onClick={toggleSidebar}
              >
                <i className="bi bi-list"></i>
              </button>
            </Navbar>
  
            {/* Page Content */}
            <Container fluid className="py-4">
            <Row>
            <div className="col-12 col-md-5">
            <h5 className="dashboard-title">Dashboard <span className="mensajes-title">&gt; API Keys</span></h5>
            </div>
            </Row>
            <Row>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="apiKey1" className="label-in form-label">OpenAI API Key</label>
                  <input type="text" className="in form-control"/>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="apiKey1" className="label-in form-label">SocialData API Key</label>
                  <input type="text" className="in form-control" />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="apiKey1" className="label-in form-label">Twitter API Key</label>
                  <input type="text" className="in form-control" />
                </div>
              </div>

              <div className="d-flex justify-content-center col-12 col-md-12">
                  <Button className="btn-save btn-style-1">Save</Button>
              </div>

            </Row>

            </Container>
          </div>
        </div>

      </>
  
    );
}
