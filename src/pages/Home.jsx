import { useLocation } from 'react-router-dom';
import Header from "../widgets/Header";
import Body from "../widgets/Body";
import ProjectDetails from '../widgets/ProjectDetails';

const Home = () => {
    const location = useLocation();
    const isProjectPage = location.pathname.startsWith('/project');
    return (
        <div>
            <Header />
            {isProjectPage ? <ProjectDetails /> : <Body />}
        </div>
    )
}

export default Home;