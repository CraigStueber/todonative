import { Image, Text, TouchableOpacity } from "react-native";
import { s } from "./CardToDo.style"
import checkImg from "../../assets/check.png";
export function CardTodo({ todo, onPress, onLongPress }) {
  return (
    <TouchableOpacity onLongPress={() =>onLongPress(todo)} style={s.card} onPress={() => onPress(todo)}>
      <Text
        style={[
          s.header,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.img} source={checkImg} />}
    </TouchableOpacity>
  );
}