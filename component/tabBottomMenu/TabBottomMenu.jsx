import {s} from "./TabBottomMenu.style";
import {Text, View, TouchableOpacity} from "react-native"

export function TabBottomMenu ({activeTab, onPress, todoList} ){
    const countByStatus = todoList.reduce(
        (acc, todo) => {
          todo.isCompleted ? acc.done++ : acc.inProgress++;
          return acc;
        },
        {
          all: todoList.length,
          inProgress: 0,
          done: 0,
        }
      );

        function setTextStyle(tabName){
            return{
                fontWeight: "bold",
                color: activeTab === tabName ? "#2F76E5" : "black",
            }
        }
    return(
        <View style={s.root}>
            <TouchableOpacity onPress={()=> onPress("all")}>
                <Text style={setTextStyle('all')}>All ({countByStatus.all})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onPress("inProgress")}>
                <Text style={setTextStyle('inProgress')}>In Progress ({countByStatus.inProgress})</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> onPress("done")}>
                <Text style={setTextStyle('done')}>Done ({countByStatus.done})</Text>
            </TouchableOpacity>


        </View>
        )
};