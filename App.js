//For Portfolio 2, I've decided to go for Option 1.1
//The goal of this option was to create additional or redesign current components
//For this particular lab, I've decided to add another "Question Quiz" to add to the TODO app done in Lab 7
//In which the primary goal of the "Question Checkbox" is moreso if to add questions 
//(it could about any subject or used in different ways) and then crossed off once a question is answered. 

import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View} from 'react-native';
import { Button, CheckBox, Input} from 'react-native-elements';

export default function App() {
  let[inputText, setInputText] = useState("")
  let[tasks, setTasks] = useState([
    {description: "Task 1", key: "1", completed: true},
    {description: "Task 2", key: "2", completed: false},
    {description: "Task 3", key: "3", completed: false},
  ])
  let addTask = useCallback(() => {
    let keys = tasks.map(task => parseInt(task.key))
    console.log(keys)
    let maxKey = Math.max(...keys) + 1
    let newTask = {description:inputText, completed: false, key: maxKey.toString()}
    console.log(newTask)
    setTasks([...tasks, newTask])
    setInputText("")
  }, [inputText])
  
  let[inputQuestion, setInputQuestion] = useState("")
  let[questions, setQuestions] = useState([
    {description: "Question 1", key: "1", completed: true},
    {description: "Question 2", key: "2", completed: false},
    {description: "Question 3", key: "3", completed: false},
  ])
  let addQuestion = useCallback(() => {
    let keys = questions.map(question => parseInt(question.key))
    console.log(keys)
    let maxKey = Math.max(...keys) + 1
    let newQuestion = {description:inputQuestion, completed: false, key: maxKey.toString()}
    console.log(newQuestion)
    setQuestions([...questions, newQuestion])
    setInputQuestion("")
  }, [inputQuestion])
return (
  <View style = {styles.container}>
  <View style = {styles.innerContainer}>
  <Text style = {styles.title}>Question App</Text>
  <Input value = {inputQuestion} onChangeText={setInputQuestion} style = {{height:30, paddingBottom: 10}}></Input>
  <Button title= "Add Question" onPress={addQuestion}></Button>
  <FlatList data={questions} keyExtractor = {(item) => item.key} renderItem={({item: question}) =>
  <CheckBox onPress={() =>{
    let curQuestion = questions.find(t => t.key == question.key)
    curQuestion.completed = !curQuestion.completed
    setQuestions([...questions])
  }} title = {question.description} 
  checked={question.completed}
  textStyle={question.completed ? {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  }: undefined}
  ></CheckBox>
}/>
  <Text style = {styles.title}>TODO App</Text>
  <Input value = {inputText} onChangeText={setInputText} style = {{height:30, paddingBottom: 10}}></Input>
  <Button title= "Add" onPress={addTask}></Button>
  <FlatList data={tasks} keyExtractor = {(item) => item.key} renderItem={({item: task}) =>
  <CheckBox onPress={() =>{
    let curTask = tasks.find(t => t.key == task.key)
    curTask.completed = !curTask.completed
    setTasks([...tasks])
  }} title = {task.description} 
  checked={task.completed}
  textStyle={task.completed ? {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  }: undefined}
  ></CheckBox>
  }/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    flex: 1,
    flexDirection: "row",
    lineHeight: 40,
    paddingBottom: 50,
    marginBottom: 50
  },
  title:{
    fontSize: 25,
    alignSelf: "center",
    padding: 15
  },
  innerContainer: {
    maxWidth: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


