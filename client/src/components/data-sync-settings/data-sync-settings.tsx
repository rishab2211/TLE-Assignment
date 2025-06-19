import React from "react";

type Props = {};

const DataSyncSettings = (props: Props) => {
  return (
    <div>
      <div>
        <div>Codeforces Data Sync Settings</div>
        <div>Configure automatic data synchronization for all students</div>
      </div>
      <div>
        <div>
          <div>Sync Schedule</div>
          <div></div>
        </div>
        <div>
          <div>Sync Status</div>
          <div></div>
        </div>
      </div>
      <div className="border-b" />
      <div>
        <div>
          <div>
            <div>Real-time Updates</div>
            <div>Automatically fetch data when the CF handle is updated</div>
          </div>

          <div>switch</div>
        </div>
      </div>

      <div>
        <div>Recent Sync History</div>
        
      </div>
    </div>
  );
};

export default DataSyncSettings;
