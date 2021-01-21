import * as React from 'react';
import { History } from '../components/History';

export function UserHistoryScreen({ route, trailsHistory }) {
    const { displayName, userId } = route.params;
    return (
        <History
            displayName={displayName}
            userId={userId}
            trailsHistory={trailsHistory.filter((trailObj) => {
                return trailObj.userId === userId;
            })}
        />
    );
}
