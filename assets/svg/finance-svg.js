import * as React from "react"

import { Svg, Path } from 'react-native-svg';

export const SvgFinance = props => {
    return (
        <Svg
            width={19}
            height={19}
            fill='none'
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5.5.5h-3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3m0-18h11a2 2 0 0 1 2 2v7m-13-9v9m0 9v-9m0 9h11a2 2 0 0 0 2-2v-7m-13 0h13"
                stroke="#1D1D1D"
                strokeOpacity={0.33}
                fill={props.color}
            />
        </Svg>
    )
}