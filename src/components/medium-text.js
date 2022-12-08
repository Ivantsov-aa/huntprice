import { Text } from "react-native";

export const MediumText = (props) => {
    return (
        <Text style={{ fontFamily: 'Inter-Medium', ...props.style }}>{props.children}</Text>
    )
}
