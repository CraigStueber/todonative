import {s} from './ButtonAdd.style';
import { TouchableOpacity, Text } from 'react-native';

export function ButtonAdd ({onPress}) {
    return(
        <TouchableOpacity style={s.btn} onPress={onPress}>
            <Text style={s.txt}>+ New ToDo</Text>
        </TouchableOpacity>
    )

}