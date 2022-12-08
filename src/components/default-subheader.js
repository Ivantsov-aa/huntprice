import { Text } from "react-native";

export const DefaultSubheader = (props) => {
    return (
        <Text style={{ fontFamily: 'Inter-SemiBold', ...props.style }}>{props.children}</Text>
    )
}
