import { Text, View, Image } from "react-native";
import logo from "../../assets/logo.png"
import { s } from "./Header.style";

export function Header () {
    return(
        <View>
      <Image style={s.img} source={logo} resizeMode="contain" />
      <Text style={s.subtitle}>You probably have something to do</Text>

        </View>
    )
}