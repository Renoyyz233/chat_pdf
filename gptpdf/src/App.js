import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PdfUpload from './components/PdfUpload/PdfUpload';
import ContentList from './components/ContentList/ContentList';
import ChatPage from './components/SecondPage/ChatPage';

function RootComponent() {
    return (
        <>
            <PdfUpload />
            <ContentList />
        </>
    );
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/"npm start element={<RootComponent />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
