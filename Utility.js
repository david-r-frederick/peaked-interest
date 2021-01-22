import { EasyIcon, MediumIcon, HardIcon } from './components/difficultyIcons/difficultyIcons';
import * as React from 'react';

export const IconMapper = {
    green: <EasyIcon />,
    blue: <MediumIcon />,
    black: <HardIcon />,
};

export const easyRuns = [
    { name: 'Endeavor', difficulty: 'green', lift: 'Montezuma Express', length: 0.24 },
    { name: "Ina's Way", difficulty: 'green', lift: 'Montezuma Express', length: 0.23 },
    { name: 'Jaybird', difficulty: 'green', lift: 'Argentine', length: 0.98 },
    { name: 'Last Chance', difficulty: 'green', lift: 'Montezuma Express', length: 0.56 },
    { name: 'Modest Girl', difficulty: 'green', lift: 'Argentine', length: 0.17 },
    { name: 'Schoolmarm', difficulty: 'green', lift: 'Montezuma Express', length: 3.5 },
    { name: 'Scout', difficulty: 'green', lift: 'Ranger', length: 0.2 },
    { name: 'Silver Spoon', difficulty: 'green', lift: 'Montezuma Express', length: 1.04 },
    { name: 'Ski-Daddle', difficulty: 'green', lift: 'Montezuma Express', length: 0.18 },
];

export const mediumRuns = [
    { name: 'Anticipation', difficulty: 'blue', lift: 'Montezuma Express', length: 1.11 },
    { name: 'Bachelor', difficulty: 'blue', lift: 'Montezuma Express', length: 0.63 },
    { name: 'Ballhooter', difficulty: 'blue', lift: 'Montezuma Express', length: 0.18 },
    { name: 'Beger', difficulty: 'blue', lift: 'Montezuma Express', length: 0.35 },
    { name: 'Bighorn', difficulty: 'blue', lift: 'Montezuma Express', length: 0.64 },
    { name: 'Bobtail', difficulty: 'blue', lift: 'Montezuma Express', length: 0.24 },
    { name: 'Cross-cut', difficulty: 'blue', lift: 'Montezuma Express', length: 0.24 },
    { name: "Dercum's Dash", difficulty: 'blue', lift: 'Montezuma Express', length: 0.29 },
    { name: 'Elk Run', difficulty: 'blue', lift: 'Montezuma Express', length: 0.96 },
    { name: 'Flying Dutchman', difficulty: 'blue', lift: 'Montezuma Express', length: 1.24 },
    { name: 'Frenchman', difficulty: 'blue', lift: 'Montezuma Express', length: 1.25 },
    { name: 'Gassy Thompson', difficulty: 'blue', lift: 'Montezuma Express', length: 0.22 },
    { name: 'Haywood', difficulty: 'blue', lift: 'Montezuma Express', length: 0.47 },
    { name: 'Hoodoo', difficulty: 'blue', lift: 'Montezuma Express', length: 0.32 },
    { name: 'Jackwhacker', difficulty: 'blue', lift: 'Montezuma Express', length: 0.68 },
    { name: 'Jacques St. James', difficulty: 'blue', lift: 'Montezuma Express', length: 0.16 },
    { name: 'Last Alamo', difficulty: 'blue', lift: 'Montezuma Express', length: 0.59 },
    { name: 'Lodgepole', difficulty: 'blue', lift: 'Montezuma Express', length: 0.6 },
    { name: 'Midland', difficulty: 'blue', lift: 'Montezuma Express', length: 0.08 },
    { name: 'Missouri', difficulty: 'blue', lift: 'Montezuma Express', length: 0.2 },
    { name: 'Mozart', difficulty: 'blue', lift: 'Montezuma Express', length: 1.29 },
    { name: 'Oh, Bob', difficulty: 'blue', lift: 'Montezuma Express', length: 0.81 },
    { name: 'Orfint Boy', difficulty: 'blue', lift: 'Montezuma Express', length: 0.08 },
    { name: 'Paymaster', difficulty: 'blue', lift: 'Montezuma Express', length: 0.87 },
    { name: 'Porcupine', difficulty: 'blue', lift: 'Montezuma Express', length: 0.7 },
    { name: 'Prospector', difficulty: 'blue', lift: 'Montezuma Express', length: 1.15 },
    { name: 'River Run', difficulty: 'blue', lift: 'Montezuma Express', length: 0.37 },
    { name: 'Santa Fe', difficulty: 'blue', lift: 'Montezuma Express', length: 0.82 },
    { name: 'Silvermaster', difficulty: 'blue', lift: 'Montezuma Express', length: 0.12 },
    { name: 'Spillway', difficulty: 'blue', lift: 'Montezuma Express', length: 0.52 },
    { name: 'Spring Dipper', difficulty: 'blue', lift: 'Montezuma Express', length: 1.43 },
    { name: 'Swandyke', difficulty: 'blue', lift: 'Montezuma Express', length: 0.28 },
    { name: 'Whipsaw', difficulty: 'blue', lift: 'Montezuma Express', length: 0.61 },
    { name: 'Wild Irishman', difficulty: 'blue', lift: 'Montezuma Express', length: 1 },
    { name: 'The Willows', difficulty: 'blue', lift: 'Montezuma Express', length: 0.83 },
];

export const hardRuns = [
    { name: '8 Iron', difficulty: 'black', lift: 'Montezuma Express', length: 0.34 },
    { name: 'Alhambra', difficulty: 'black', lift: 'Montezuma Express', length: 0.22 },
    { name: 'Ambush', difficulty: 'black', lift: 'Montezuma Express', length: 0.62 },
    { name: 'Badger', difficulty: 'black', lift: 'Montezuma Express', length: 0.33 },
    { name: 'Bingo', difficulty: 'black', lift: 'Montezuma Express', length: 0.09 },
    { name: 'Black Hawk', difficulty: 'black', lift: 'Montezuma Express', length: 0.2 },
    { name: 'Black Rock', difficulty: 'black', lift: 'Montezuma Express', length: 0.42 },
    { name: 'Bullet', difficulty: 'black', lift: 'Montezuma Express', length: 0.37 },
    { name: 'Bullet Glades', difficulty: 'black', lift: 'Montezuma Express', length: 0.17 },
    { name: 'Bushwhacker', difficulty: 'black', lift: 'Montezuma Express', length: 0.6 },
    { name: 'Cat Dancer', difficulty: 'black', lift: 'Montezuma Express', length: 0.97 },
    { name: 'Cat South Glades', difficulty: 'black', lift: 'Montezuma Express', length: 0.3 },
    { name: 'Christmas Tree', difficulty: 'black', lift: 'Montezuma Express', length: 0.27 },
    { name: 'Conquest', difficulty: 'black', lift: 'Montezuma Express', length: 0.38 },
    { name: 'Cornucopia', difficulty: 'black', lift: 'Montezuma Express', length: 0.42 },
    { name: 'Coyote Caper', difficulty: 'black', lift: 'Montezuma Express', length: 1.53 },
    { name: 'Diamond Back', difficulty: 'black', lift: 'Montezuma Express', length: 1.14 },
    { name: 'Geronimo', difficulty: 'black', lift: 'Montezuma Express', length: 0.46 },
    { name: 'Go Devil', difficulty: 'black', lift: 'Peru Express', length: 0.88 },
    { name: 'Goalpost Gully', difficulty: 'black', lift: 'Montezuma Express', length: 0.3 },
    { name: 'Indy Face', difficulty: 'black', lift: 'Montezuma Express', length: 0.39 },
    { name: 'Jackface', difficulty: 'black', lift: 'Montezuma Express', length: 0.2 },
    { name: `Jane's Journey`, difficulty: 'black', lift: 'Montezuma Express', length: 0.44 },
    { name: 'Last Hoot', difficulty: 'black', lift: 'Montezuma Express', length: 0.53 },
    { name: 'Liberty', difficulty: 'black', lift: 'Montezuma Express', length: 0.26 },
    { name: 'Liberty Trees', difficulty: 'black', lift: 'Montezuma Express', length: 0.24 },
    { name: 'Midnight Ride', difficulty: 'black', lift: 'Montezuma Express', length: 0.22 },
    { name: 'Mine Shaft', difficulty: 'black', lift: 'Montezuma Express', length: 0.49 },
    { name: `Mr. Toad's Wild Ride`, difficulty: 'black', lift: 'Montezuma Express', length: 0.97 },
    { name: 'Open 61', difficulty: 'black', lift: 'Montezuma Express', length: 0.34 },
    { name: 'P.B.', difficulty: 'black', lift: 'Montezuma Express', length: 0.26 },
    { name: 'Patriot', difficulty: 'black', lift: 'Montezuma Express', length: 0.34 },
    { name: 'Pika Glades', difficulty: 'black', lift: 'Montezuma Express', length: 0.45 },
    { name: 'Powder Cap', difficulty: 'black', lift: 'Montezuma Express', length: 0.64 },
    { name: 'Puma Bowl', difficulty: 'black', lift: 'Montezuma Express', length: 0.24 },
    { name: 'Rathbone', difficulty: 'black', lift: 'Montezuma Express', length: 0.29 },
    { name: 'Revolution', difficulty: 'black', lift: 'Montezuma Express', length: 0.19 },
    { name: 'Richter', difficulty: 'black', lift: 'Peru Express', length: 0.12 },
    { name: 'South Bowl Trees', difficulty: 'black', lift: 'Montezuma Express', length: 0.09 },
    { name: 'Starfire', difficulty: 'black', lift: 'Montezuma Express', length: 0.87 },
    { name: 'Stray Horse', difficulty: 'black', lift: 'Montezuma Express', length: 0.32 },
    { name: 'Tele Trees', difficulty: 'black', lift: 'Montezuma Express', length: 0.35 },
    { name: 'The Corral', difficulty: 'black', lift: 'Montezuma Express', length: 0.39 },
    { name: 'The Edge', difficulty: 'black', lift: 'Montezuma Express', length: 0.26 },
    { name: 'The Grizz', difficulty: 'black', lift: 'Montezuma Express', length: 0.38 },
    { name: 'The Stadium', difficulty: 'black', lift: 'Montezuma Express', length: 0.35 },
    { name: 'The Trap', difficulty: 'black', lift: 'Montezuma Express', length: 0.46 },
    { name: 'The Wolf Den', difficulty: 'black', lift: 'Montezuma Express', length: 0.47 },
    { name: 'Timberwolf', difficulty: 'black', lift: 'Montezuma Express', length: 0.52 },
    { name: 'Tommy Knocker', difficulty: 'black', lift: 'Montezuma Express', length: 0.65 },
    { name: 'Two If By Sea', difficulty: 'black', lift: 'Montezuma Express', length: 0.42 },
    { name: 'Victory Chutes', difficulty: 'black', lift: 'Montezuma Express', length: 0.34 },
    { name: 'Wildcat', difficulty: 'black', lift: 'Montezuma Express', length: 0.65 },
    { name: 'Wildfire', difficulty: 'black', lift: 'Montezuma Express', length: 0.63 },
    { name: 'Wolverine', difficulty: 'black', lift: 'Montezuma Express', length: 0.69 },
    { name: 'Wombat Chutes', difficulty: 'black', lift: 'Montezuma Express', length: 0.25 },
];

export const combineDurations = function (durationOne = '00:00:00', durationTwo = '00:00:00') {
    const durationOneSplit = durationOne.split(':').map((nStr) => parseInt(nStr));
    const durationTwoSplit = durationTwo.split(':').map((nStr) => parseInt(nStr));
    durationTwoSplit.forEach((num, index) => {
        durationOneSplit[index] += num;
    });
    for (let i = 2; i > 0; i--) {
        if (durationOneSplit[i] >= 60) {
            durationOneSplit[i - 1] += Math.floor(durationOneSplit[i] / 60);
            durationOneSplit[i] = durationOneSplit[i] % 60;
        }
    }
    return durationOneSplit
        .map((n) => {
            if (n < 10) {
                return `0${n}`;
            }
            return `${n}`;
        })
        .join(':');
};