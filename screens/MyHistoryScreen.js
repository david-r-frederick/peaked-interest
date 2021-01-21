import * as React from 'react';
import { History } from '../components/History';

export function MyHistoryScreen({ displayName, trailsHistory }) {
    return <History displayName={displayName} trailsHistory={trailsHistory} />;
}
