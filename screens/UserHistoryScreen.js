import * as React from 'react';
import { History } from '../components/History';

export function UserHistoryScreen({ route }) {
    const { displayName, userId } = route.params;
    return <History displayName={displayName} userId={userId} userRoutesQuantity={"placeholder"} />;
}
