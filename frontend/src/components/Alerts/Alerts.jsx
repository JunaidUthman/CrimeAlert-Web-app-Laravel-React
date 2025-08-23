import { useEffect, useState } from "react";
import {getMyAlerts} from "../../services/AlertService";
import {DeleteAlert} from "../../services/AlertService";
import AlertsView from "./AlertsView";

export default function Alerts() {
  const [myAlerts, setMyAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateClicked, setCreateClicked] = useState(false);
  const [isUpdateClicked, setUpdateClicked] = useState(false);
  const [UpdateData, setUpdateData] = useState(null);
  const [closePopup, setClosePopup] = useState(false);
  const handleClosePopup = () => {
    setClosePopup(true)
    setUpdateData(null);
    };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    setLoading(true);
    getMyAlerts()
      .then((res) => {
        setMyAlerts(res.data);

      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCreate = () => {
    setCreateClicked(true);
    setClosePopup(false);
  };

  const OpenEdit = (UpdateData) => {
    setUpdateClicked(true);
    setUpdateData(UpdateData);
    setClosePopup(false);
  };

  const handleDelete = (Alert) => {
    DeleteAlert(Alert)
    .then((res)=>{
      alert("Alert deleted successfully");
    })
    .catch((err)=>{
      console.error(err);
      alert("Failed to delete alert. Please try again.");
    })
  };

  return (
    <AlertsView 
      myAlerts={myAlerts} 
      loading={loading}
      onCreate={handleCreate}
      onEdit={OpenEdit}
      onDelete={handleDelete}
      isCreateClicked={isCreateClicked}
      isUpdateClicked={isUpdateClicked}
      UpdateData={UpdateData}
      setClosePopup={handleClosePopup}
      closePopup={closePopup}

    />
  );
}