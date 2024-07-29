import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./layouts/Topbar";
import { useLocation } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import { CssBaseline, ThemeProvider ,Box} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CreateAccount from "./pages/createacc";
import Home from "./pages/home";
import Login from "./pages/loginOutlook";
import Gri1 from "./pages/esgform/GRI301";
import Gri2 from "./pages/esgform/GRI302";
import Gri3 from "./pages/esgform/GRI303";
import Gri5 from "./pages/esgform/GRI305";
import Gri from "./pages/esgform/GRIs";
import AD from "./pages/esgform/ApproveDeny";
import Delete from "./pages/DeleteProfile";
import ViewProfile from "./pages/ViewProfile";
import Log from "./pages/Logbook";
import Resubmit from "./pages/resubmit";
import ResubmitTemplate from "./pages/resubmittemplate";
import Summary from "./pages/summary";
import Pdf from "./pages/download";
import { ToastContainer} from 'react-toastify';
import Formtemplate from "./pages/esgform/formtemplate";
import SubFormtemplate from "./pages/esgform/submittedforms";
import ViewForms from "./pages/esgform/viewForms";
import ViewFormsTemplate from "./pages/esgform/viewFormsTemplate";
import Gri6 from "./pages/esgform/GRI306";
import ServiceReq from "./pages/ServiceRequest";
import ReviewReq from "./pages/RequestReview";

function App() {
  const location = useLocation();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  const showSidebar = !((location.pathname === "/") || (location.pathname === "/gri") || (location.pathname === "/ad") ||(location.pathname === "/viewFT") || (location.pathname === "/resubmit")|| (location.pathname === "/summary") || (location.pathname === "/getpdf")) ;
  const showTopbar = !((location.pathname === "/") || (location.pathname === "/gri") || (location.pathname === "/ad") || (location.pathname === "/viewFT") || (location.pathname === "/resubmit") || (location.pathname === "/summary") || (location.pathname === "/getpdf") ) ;
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Box sx={{ display: 'flex',width: showSidebar ? '1200px' : '100%', }}>
        {showTopbar && <Topbar/>}
          {showSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className={`content${showSidebar || showTopbar ? '' : ' full-width-content'}`}>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: showTopbar ? '50px' : '0', 
              
            }}
          >
            <Routes>
              
              <Route path="/datainput" element={<Formtemplate/>} />
              <Route path="/grading" element={<SubFormtemplate/>} />
              <Route path="/gri1" element={<Gri1/>} />
              <Route path="/gri2" element={<Gri2 />} />
              <Route path="/gri3" element={<Gri3 />} />
              <Route path="/gri5" element={<Gri5 />} />
              <Route path="/gri6" element={<Gri6 />} />
              <Route path="/createacc" element={<CreateAccount />} />
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/gri" element={<Gri/>} />
              <Route path="/ad" element={<AD/>} />
              <Route path="/viewF" element={<ViewForms/>} />
              <Route path="/viewFT" element={<ViewFormsTemplate/>} />
              <Route path="/log" element={<Log/>} />
              <Route path="/delete" element={<Delete/>}/>
              <Route path="/view" element={<ViewProfile/>}/>
              <Route path="/resubmitportal" element={<ResubmitTemplate/>}/>
              <Route path="/resubmit" element={<Resubmit/>}/>
              <Route path="/getpdf" element={<Pdf/>}/>
              <Route path="/summary" element={<Summary/>}/>
              <Route path="/raiseTicket" element={<ServiceReq/>}/>
              <Route path="/requestReview" element={<ReviewReq/>}/>
            </Routes>
            <ToastContainer position='top-center' />
        </Box> 
        </main>
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
