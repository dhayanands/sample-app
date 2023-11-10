import { NavBar } from '@cegal/ds-components';
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();

  return (
    <div className='paddedBox'>
      <NavBar underscore >
        <NavBar.Link onClick={() => navigate('/')}>
          Onboard Company
        </NavBar.Link>
        <NavBar.Link onClick={() => navigate('/appreg')}>
          Application registration
        </NavBar.Link>
        <NavBar.Link onClick={() => navigate('/addUsersToCompany')}>
          Add Users To Company
        </NavBar.Link>
        <NavBar.Link onClick={() => navigate('/addUsersToApplication')}>
          Add Users To Application
        </NavBar.Link>
        <NavBar.Link onClick={() => navigate('/removeUsersFromCompany')}>
          Remove Users from Company
        </NavBar.Link>
        <NavBar.Link onClick={() => navigate('/removeUsersFromApplication')}>
          Remove Users From Application
        </NavBar.Link>
        <NavBar.Link onClick={() => navigate('/summary')}>
          Summary
        </NavBar.Link>
      </NavBar>
    </div>
  )
}

function NavbarComponent() {
    return (
        <Component/>
    )
}

export default NavbarComponent