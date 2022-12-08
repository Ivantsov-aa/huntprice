import { Text } from "react-native";

export const DefaultHeader = (props) => {
    return (
        <Text style={{ fontFamily: 'Inter-Bold', ...props.style }}>{props.children}</Text>
    )
}
