import AlertForm from "../AlertForm/AlertForm";
import { useState } from "react";
export default function AlertsView({ myAlerts, loading, onCreate, onEdit, onDelete , isCreateClicked , isUpdateClicked , UpdateData , setClosePopup , closePopup}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (loading) {
    return (
      <main className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-600 mb-4"></div>
            <div className="text-gray-600 text-lg font-medium">Loading alerts...</div>
          </div>
        </div>
      </main>
    );
  }

  



  return (
    <main className="p-8 bg-gray-50 min-h-screen">
    {(isCreateClicked ) && !closePopup &&
    <div className="fixed inset-0 flex w-30 justify-center items-center bg-gray-900 bg-opacity-50 z-50"> 
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <AlertForm formType={"create"} closePopup={setClosePopup}/>
      </div>
    </div>
    }
    {isUpdateClicked && UpdateData && !closePopup &&
    <div className="fixed inset-0 flex w-30 justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <AlertForm UpdateData={UpdateData} formType={"update"} closePopup={setClosePopup}/>
      </div>
    </div>
}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts Management</h1>
          </div>
          <button
            onClick={onCreate}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Alert
          </button>
        </div>
      </div>

      {myAlerts && myAlerts.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Table Stats */}
          <div className="px-8 py-6 bg-gradient-to-r from-red-50 to-white border-b border-red-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {myAlerts.length}
                </div>
                <span className="text-gray-600 font-medium">Total Alerts</span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(new Date())}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      ID
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Location
                    </div>
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider">
                    Updated At
                  </th>
                  <th className="px-8 py-5 text-center text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {myAlerts.map((alert, index) => (
                  <tr 
                    key={alert.id} 
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-red-50 transition-all duration-200 border-b border-gray-100 hover:shadow-md`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                          {alert.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {alert.title}
                      </div>
                      <div className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full inline-block">
                        ACTIVE
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-700 max-w-xs">
                        <div className="line-clamp-2 leading-relaxed">
                          {alert.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg font-mono">
                        <div className="flex items-center gap-1">
                          <span className="text-red-600 font-semibold">Lat:</span> {alert.lat}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-red-600 font-semibold">Lng:</span> {alert.lng}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-600">
                        {formatDate(alert.created_at)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-600">
                        {formatDate(alert.updated_at)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                         onClick={() => onEdit(alert)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg group"
                          title="Edit Alert"
                        >
                          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('⚠️ Are you sure you want to delete this alert? This action cannot be undone.')) {
                              onDelete(alert);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg group"
                          title="Delete Alert"
                        >
                          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No alerts found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't created any alerts yet. Get started by creating your first alert to monitor important events and locations.
          </p>
          <button
            onClick={onCreate}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Your First Alert
            </div>
          </button>
        </div>
      )}
    </main>
  );
}