import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { s } from "./App.style";
import {Header} from "./component/header/Header"
import {CardTodo} from "./component/cardTodo/CardToDo";
import { TabBottomMenu } from "./component/tabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./component/buttonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
export default function App() {
  const [todoList, setTodoList] = useState([
    
  ])
  const [selectedTab, setSelectedTab ] =useState("all")
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  function getFilteredList(){
    switch (selectedTab) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function deleteTodo(todoToDelete) {
      Alert.alert("Delete To Do", "Are you sure you want to delete this to do?",
      [
        {text: "Delete", style:"destructive", onPress:()=>{
          setTodoList(todoList.filter(t=> t.id !== todoToDelete.id))
        }},
        {text: "Cancel", style:"cancel"},
      ])
  
  };


  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardTodo  onPress={updateTodo} todo={todo} onLongPress={deleteTodo} />
      </View>
    ));
  }
  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(
      (t) => t.id === updatedTodo.id
    );
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }
  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue("");
  }
  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => setIsAddDialogDisplayed(false)}
      >
        <Dialog.Title>Add todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo</Dialog.Description>
        <Dialog.Input
          onChangeText={setInputValue}
          placeholder="Ex : Go to the dentis"
        />
        <Dialog.Button
          label="Cancel"
          color="grey"
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView style={s.app}>  
          
          <View style={s.header}>
            <Header/>
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={() => setIsAddDialogDisplayed(true)}/>
          <View style={s.footer}>
           <TabBottomMenu activeTab={selectedTab} onPress={setSelectedTab}  todoList={todoList}/>
          </View>
         
      </SafeAreaView>
    </SafeAreaProvider>
    {renderAddDialog()}
    
    </>
  );
}
