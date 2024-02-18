import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

export default function Dashboard() {
  const location = useLocation();
  const [tab,settab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl) settab(tabFromUrl);

  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* SideBar */}
        <DashSideBar />
      </div>
      { tab=='profile' && <DashProfile />}
      { tab=='posts' && <DashPosts />}
    </div>
  )
}
