import { Text } from "react-native";

export const DefaultText = (props) => {
    return (
        <Text style={{ fontFamily: 'Inter-Regular', ...props.style }}>{props.children}</Text>
    )
}
