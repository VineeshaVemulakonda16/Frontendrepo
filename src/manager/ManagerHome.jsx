import { useState, useEffect } from 'react';
import './manager.css';


;
export default function ManagerHome() {
  const [manager, setManager] = useState("");
  
  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      setManager(JSON.parse(storedManager));
    }
  }, []);
  
  return (
    <div className="manager-bg">
      
    </div>
  );
}
