import * as React from 'react';
import { History } from '../components/History';

export function MyHistoryScreen({ userId, displayName, userRoutesQuantity }) {
    return <History displayName={displayName} userId={userId} userRoutesQuantity={userRoutesQuantity} />;
}
