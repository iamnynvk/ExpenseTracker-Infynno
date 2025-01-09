import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import AppHeader from "../components/Header/AppHeader";
import { COLORS } from "../constants";
import { BarChart, PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { EmptyComponent } from "../components/EmptyComponent/EmptyComponent";

const Chart = () => {
  const { expenses } = useSelector((state: any) => state.expense);

  const processChartData = () => {
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((expense: any) => {
      const category = expense.category || "Other";
      categoryTotals[category] =
        (categoryTotals[category] || 0) + parseFloat(expense.amount);
    });
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    return { labels, data };
  };

  const chartData = processChartData();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <AppHeader isLogo={true} title={"Expense Chart"} />

      {expenses?.length > 0 ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          {/* Bar Chart */}
          <Text style={styles.chartTitle}>Expenses by Category</Text>
          <BarChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.data }],
            }}
            width={SCREEN_WIDTH - wp(8)}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.lightBorder,
              backgroundGradientFrom: COLORS.background,
              backgroundGradientTo: COLORS.lightBorder,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: wp(4),
              },
            }}
            style={{
              marginVertical: wp(5),
              borderRadius: wp(4),
            }}
          />

          {/* Pie Chart */}
          <Text style={styles.chartTitle}>Expenses Breakdown</Text>
          <PieChart
            data={chartData.labels.map((label, index) => ({
              name: label,
              population: chartData.data[index],
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              legendFontColor: COLORS.textColor,
              legendFontSize: 12,
            }))}
            width={SCREEN_WIDTH - 30}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>
      ) : (
        <EmptyComponent contentStyles={{ marginTop: SCREEN_HEIGHT / 2.5 }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chartTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginVertical: wp(5),
    color: COLORS.textColor,
  },
});

export default Chart;
