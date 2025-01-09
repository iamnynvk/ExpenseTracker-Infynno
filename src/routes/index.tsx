import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import AddExpense from "../screens/AddExpense";
import Chart from "../screens/Chart";

export type RootStackParamList = {
  Home: undefined;
  AddExpense: { expenseData?: any };
  Chart: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
          options={{ animation: "fade_from_bottom", presentation: "modal" }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          options={{ animation: "fade_from_bottom", presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
